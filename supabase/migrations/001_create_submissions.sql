create table if not exists public.assessment_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  email text not null,
  consent boolean not null default true,
  -- ASRS scores
  asrs_inattention_score integer,
  asrs_hyperactivity_score integer,
  asrs_total_score integer,
  asrs_severity text,
  asrs_screener_positive boolean,
  -- DASS-21 scores
  dass_depression_score integer,
  dass_depression_severity text,
  dass_anxiety_score integer,
  dass_anxiety_severity text,
  dass_stress_score integer,
  dass_stress_severity text,
  -- Overlap flag
  overlap_flag boolean
);
-- Enable Row Level Security
alter table public.assessment_submissions enable row level security;
-- Allow server-side inserts only (no public read/write)
create policy "Service role only" on public.assessment_submissions
  for all using (false);
