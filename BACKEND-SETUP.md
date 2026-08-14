# Shared database setup

The CRM includes a Supabase/Postgres backend schema and a compatibility sync layer. Until configuration is added, the public site continues in offline browser-storage mode.

1. Create a Supabase project in the required region.
2. Run `supabase/migrations/202608140001_initial_crm.sql` in the SQL editor.
3. Create staff accounts under Authentication > Users.
4. Insert one matching row per account into `public.profiles`, using the Auth user UUID, the Pramukh Test House tenant UUID, branch UUID, staff name and role.
5. Copy the project URL and **anon/publishable** key into `assets/js/backend-config.js`.
6. Never publish the service-role key. It bypasses row-level security.
7. Deploy the frontend, sign in with a Supabase user, and allow the first account to upload the current browser dataset. Later users then receive the same shared state.

The `app_state` table makes every existing module multi-user immediately. The normalized Clients, Enquiries, Quotations, Quotation Lines, Follow-ups and Tenders tables are included for the permanent per-record migration, foreign-key integrity, reporting and optimistic concurrency.

Before production cutover, test every role and branch, enable MFA, configure password-reset email, enable database backups/PITR, and remove the offline demo-password fallback.
