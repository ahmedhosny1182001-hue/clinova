-- CLINOVA initial database schema (run in Supabase SQL Editor)
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text not null default 'ar' check (preferred_language in ('ar','en')),
  role text not null default 'student' check (role in ('student','clinician','admin')),
  medical_year smallint,
  created_at timestamptz not null default now()
);

create table if not exists public.clinical_cases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  specialty text not null,
  difficulty text not null default 'intermediate',
  summary text not null,
  case_data jsonb not null default '{}'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.case_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  case_id uuid not null references public.clinical_cases(id) on delete cascade,
  score numeric(5,2),
  decisions jsonb not null default '[]'::jsonb,
  feedback jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.study_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic text not null,
  specialty text not null,
  mastery smallint not null default 0 check (mastery between 0 and 100),
  last_reviewed_at timestamptz,
  unique(user_id, topic)
);

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.case_attempts enable row level security;
alter table public.study_progress enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.clinical_cases enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users can view own attempts" on public.case_attempts
  for select using (auth.uid() = user_id);
create policy "Users can create own attempts" on public.case_attempts
  for insert with check (auth.uid() = user_id);
create policy "Users can update own attempts" on public.case_attempts
  for update using (auth.uid() = user_id);
create policy "Users can manage own progress" on public.study_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own AI conversations" on public.ai_conversations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Published cases are visible" on public.clinical_cases
  for select using (is_published = true);

-- Create a profile automatically when a new auth user registers.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', 'CLINOVA Student'));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
