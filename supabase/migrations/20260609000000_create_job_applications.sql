create table if not exists public.job_applications (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  position text not null,
  cover_letter text,
  cv_url text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.job_applications enable row level security;

-- Policies
create policy "Anyone can insert job applications"
  on public.job_applications for insert
  with check (true);

create policy "Anyone can view job applications"
  on public.job_applications for select
  using (true);

create policy "Anyone can update job applications"
  on public.job_applications for update
  using (true);

create policy "Anyone can delete job applications"
  on public.job_applications for delete
  using (true);
