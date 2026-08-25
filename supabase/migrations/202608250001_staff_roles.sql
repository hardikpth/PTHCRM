alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (
  role in ('Super Admin','Director','Laboratory Head','CRM Manager','Quality Manager','Technical Manager','Authorised Signatory','Sales Executive','User')
);

create or replace function public.is_manager() returns boolean language sql stable security definer
set search_path=public as $$
  select coalesce((select role in ('Super Admin','Director','Laboratory Head','CRM Manager') from profiles where id=auth.uid() and is_active),false)
$$;
