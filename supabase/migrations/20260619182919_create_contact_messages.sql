create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,

  is_read boolean default false,

  created_at timestamp with time zone default now()
);

-- 1. Reset everything
drop policy if exists "Allow insert" on public.contact_messages;
drop policy if exists "Enable insert" on public.contact_messages;
drop policy if exists "Public insert" on public.contact_messages;

-- 2. Ensure RLS is ON
alter table public.contact_messages enable row level security;

-- 3. Create ONE clean working policy
create policy "allow_insert_contact_messages"
on public.contact_messages
for insert
to anon
with check (true);