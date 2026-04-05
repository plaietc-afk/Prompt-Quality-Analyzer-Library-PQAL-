-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Create the library_entries table
create table if not exists library_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  saved_at timestamptz default now() not null,
  original_prompt text not null,
  improved_prompt text not null,
  prompt_type text not null,
  language text not null,
  score jsonb not null,
  grade text not null,
  feedback jsonb not null
);

-- 2. Create index for fast user queries
create index if not exists idx_library_entries_user_id on library_entries(user_id);
create index if not exists idx_library_entries_saved_at on library_entries(saved_at desc);

-- 3. Enable Row Level Security
alter table library_entries enable row level security;

-- 4. RLS Policies: users can only access their own entries
create policy "Users can read own entries"
  on library_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own entries"
  on library_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own entries"
  on library_entries for delete
  using (auth.uid() = user_id);
