create extension if not exists pgcrypto;
create extension if not exists citext;

create table public.tenants (
  id uuid primary key default gen_random_uuid(), slug citext unique not null,
  name text not null, created_at timestamptz not null default now()
);
create table public.branches (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.tenants on delete cascade,
  code citext not null, name text not null, created_at timestamptz not null default now(), unique(tenant_id, code)
);
create table public.profiles (
  id uuid primary key references auth.users on delete cascade, tenant_id uuid not null references public.tenants,
  branch_id uuid references public.branches, name text not null, role text not null check(role in ('Super Admin','Laboratory Head','CRM Manager','Quality Manager','Technical Manager','Authorised Signatory','User')),
  is_active boolean not null default true, created_at timestamptz not null default now()
);

create or replace function public.current_tenant_id() returns uuid language sql stable security definer
set search_path=public as $$ select tenant_id from profiles where id=auth.uid() and is_active $$;
create or replace function public.is_manager() returns boolean language sql stable security definer
set search_path=public as $$ select coalesce((select role in ('Super Admin','Laboratory Head','CRM Manager') from profiles where id=auth.uid() and is_active),false) $$;

-- Compatibility store used by the current frontend during the normalized-table cutover.
create table public.app_state (
  tenant_slug citext not null references public.tenants(slug) on delete cascade,
  store_key text not null, payload jsonb not null default '{}'::jsonb,
  version bigint not null default 1, updated_at timestamptz not null default now(), updated_by uuid default auth.uid(),
  primary key(tenant_slug, store_key)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.tenants,
  branch_id uuid references public.branches, name text not null, industry text, contact_person text,
  phone text, email citext, gst text, address text, notes text, owner_id uuid references public.profiles,
  version int not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  created_by uuid default auth.uid(), updated_by uuid default auth.uid(), deleted_at timestamptz
);
create table public.enquiries (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.tenants,
  branch_id uuid references public.branches, client_id uuid not null references public.clients,
  source_ref text, project text not null, category text, value numeric(14,2) not null default 0,
  stage text not null default 'new', probability smallint not null default 10 check(probability between 0 and 100),
  owner_id uuid references public.profiles, priority text default 'medium', source_data jsonb not null default '{}'::jsonb,
  version int not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  created_by uuid default auth.uid(), updated_by uuid default auth.uid(), deleted_at timestamptz
);
create table public.quotations (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.tenants,
  branch_id uuid references public.branches, client_id uuid not null references public.clients,
  enquiry_id uuid references public.enquiries, number citext not null, status text not null default 'draft',
  date date not null default current_date, valid_until date, discount_pct numeric(6,2) default 0,
  subtotal numeric(14,2) default 0, tax numeric(14,2) default 0, total numeric(14,2) default 0, terms text,
  version int not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  created_by uuid default auth.uid(), updated_by uuid default auth.uid(), deleted_at timestamptz,
  unique(tenant_id, number)
);
create table public.quotation_lines (
  id uuid primary key default gen_random_uuid(), quotation_id uuid not null references public.quotations on delete cascade,
  line_no int not null, category text, name text not null, code text, parameters jsonb not null default '[]'::jsonb,
  qty numeric(12,3) not null default 1, unit text, rate numeric(14,2), discount_pct numeric(6,2) default 0,
  on_request boolean not null default false, unique(quotation_id,line_no)
);
create table public.followups (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references public.tenants,
  branch_id uuid references public.branches, client_id uuid not null references public.clients,
  enquiry_id uuid references public.enquiries, quotation_id uuid references public.quotations,
  subject text not null, due_at timestamptz not null, channel text, assignee_id uuid references public.profiles,
  priority text default 'medium', status text default 'open', notes text, outcome text,
  version int not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  created_by uuid default auth.uid(), updated_by uuid default auth.uid(), deleted_at timestamptz
);
create table public.audit_events (
  id bigint generated always as identity primary key, tenant_id uuid not null references public.tenants,
  occurred_at timestamptz not null default now(), actor_id uuid, action text not null,
  entity_type text not null, entity_id uuid, before_data jsonb, after_data jsonb,
  user_agent text, previous_hash text, row_hash text not null
);

create index enquiries_stage_idx on public.enquiries(tenant_id,stage) where deleted_at is null;
create index followups_due_idx on public.followups(assignee_id,due_at) where deleted_at is null;
create index quotations_client_idx on public.quotations(client_id,status) where deleted_at is null;
create index clients_name_idx on public.clients(tenant_id,lower(name)) where deleted_at is null;

create or replace function public.write_audit_event() returns trigger language plpgsql security definer
set search_path=public as $$
declare
  payload jsonb; tenant uuid; entity uuid; previous text; digest text;
begin
  perform pg_advisory_xact_lock(hashtext('pth-audit-chain'));
  payload=case when tg_op='DELETE' then to_jsonb(old) else to_jsonb(new) end;
  tenant=(payload->>'tenant_id')::uuid;
  entity=nullif(payload->>'id','')::uuid;
  select row_hash into previous from audit_events where tenant_id=tenant order by id desc limit 1;
  digest=encode(digest(coalesce(previous,'') || tg_op || tg_table_name || coalesce(entity::text,'') || payload::text || clock_timestamp()::text,'sha256'),'hex');
  insert into audit_events(tenant_id,actor_id,action,entity_type,entity_id,before_data,after_data,previous_hash,row_hash)
  values(tenant,auth.uid(),tg_op,tg_table_name,entity,case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) end,case when tg_op in ('INSERT','UPDATE') then to_jsonb(new) end,previous,digest);
  return coalesce(new,old);
end $$;

create trigger clients_audit after insert or update or delete on public.clients for each row execute function public.write_audit_event();
create trigger enquiries_audit after insert or update or delete on public.enquiries for each row execute function public.write_audit_event();
create trigger quotations_audit after insert or update or delete on public.quotations for each row execute function public.write_audit_event();
create trigger followups_audit after insert or update or delete on public.followups for each row execute function public.write_audit_event();

create or replace function public.touch_row() returns trigger language plpgsql as $$
begin new.updated_at=now(); new.updated_by=auth.uid(); new.version=old.version+1; return new; end $$;
create trigger app_state_touch before update on public.app_state for each row execute function public.touch_row();
create trigger clients_touch before update on public.clients for each row execute function public.touch_row();
create trigger enquiries_touch before update on public.enquiries for each row execute function public.touch_row();
create trigger quotations_touch before update on public.quotations for each row execute function public.touch_row();
create trigger followups_touch before update on public.followups for each row execute function public.touch_row();

alter table public.tenants enable row level security;
alter table public.branches enable row level security;
alter table public.profiles enable row level security;
alter table public.app_state enable row level security;
alter table public.clients enable row level security;
alter table public.enquiries enable row level security;
alter table public.quotations enable row level security;
alter table public.quotation_lines enable row level security;
alter table public.followups enable row level security;
alter table public.audit_events enable row level security;

create policy tenant_read on public.tenants for select using(id=public.current_tenant_id());
create policy branch_tenant on public.branches for all using(tenant_id=public.current_tenant_id()) with check(tenant_id=public.current_tenant_id());
create policy profiles_tenant on public.profiles for select using(tenant_id=public.current_tenant_id());
create policy app_state_tenant on public.app_state for all using(tenant_slug=(select slug from tenants where id=public.current_tenant_id())) with check(tenant_slug=(select slug from tenants where id=public.current_tenant_id()));
create policy clients_tenant on public.clients for all using(tenant_id=public.current_tenant_id()) with check(tenant_id=public.current_tenant_id());
create policy enquiries_tenant on public.enquiries for all using(tenant_id=public.current_tenant_id()) with check(tenant_id=public.current_tenant_id());
create policy quotations_tenant on public.quotations for all using(tenant_id=public.current_tenant_id()) with check(tenant_id=public.current_tenant_id());
create policy quotation_lines_tenant on public.quotation_lines for all using(exists(select 1 from quotations q where q.id=quotation_id and q.tenant_id=public.current_tenant_id())) with check(exists(select 1 from quotations q where q.id=quotation_id and q.tenant_id=public.current_tenant_id()));
create policy followups_tenant on public.followups for all using(tenant_id=public.current_tenant_id()) with check(tenant_id=public.current_tenant_id());
create policy audit_read on public.audit_events for select using(tenant_id=public.current_tenant_id() and public.is_manager());

insert into public.tenants(slug,name) values('pramukh-test-house','Pramukh Test House') on conflict do nothing;
insert into public.branches(tenant_id,code,name)
select id,v.code,v.name from public.tenants cross join (values ('SURAT','Surat (HO)'),('AHMEDABAD','Ahmedabad'),('VADODARA','Vadodara'),('RAJKOT','Rajkot'),('MUMBAI','Mumbai')) v(code,name)
where slug='pramukh-test-house' on conflict do nothing;
