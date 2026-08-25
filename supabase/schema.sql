-- B2B Pipeline — Partner/Channel Pipeline MVP schema
-- Run in Supabase SQL editor. Multi-tenant via org_id + RLS.

-- ============ TABLES ============
create table if not exists orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'free' check (plan in ('free','starter','growth')),
  stripe_customer text,
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  org_id uuid not null references orgs(id) on delete cascade,
  email text not null,
  role text not null default 'owner' check (role in ('owner','admin','member')),
  created_at timestamptz not null default now()
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  name text not null,
  company text,
  type text not null default 'referral' check (type in ('referral','reseller','affiliate')),
  contact_email text,
  commission_rate numeric not null default 0.10 check (commission_rate >= 0 and commission_rate <= 1),
  status text not null default 'active' check (status in ('active','paused')),
  created_at timestamptz not null default now()
);

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  partner_id uuid references partners(id) on delete set null,
  referred_company text not null,
  referred_contact text,
  status text not null default 'new' check (status in ('new','contacted','qualified','closed','lost')),
  created_at timestamptz not null default now()
);

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  partner_id uuid references partners(id) on delete set null,
  referral_id uuid references referrals(id) on delete set null,
  name text not null,
  stage text not null default 'registered' check (stage in ('registered','qualifying','negotiation','won','lost')),
  amount numeric not null default 0 check (amount >= 0),
  close_date date,
  created_at timestamptz not null default now()
);

create table if not exists commissions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  deal_id uuid not null references deals(id) on delete cascade,
  partner_id uuid references partners(id) on delete set null,
  rate numeric not null default 0,
  amount numeric not null default 0,
  status text not null default 'pending' check (status in ('pending','approved','paid'))
);

create table if not exists payouts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  partner_id uuid references partners(id) on delete set null,
  period text not null,
  total_amount numeric not null default 0,
  status text not null default 'draft' check (status in ('draft','approved','paid'))
);

-- ============ INDEXES ============
create index if not exists idx_partners_org on partners(org_id);
create index if not exists idx_deals_org on deals(org_id);
create index if not exists idx_deals_stage on deals(org_id, stage);
create index if not exists idx_referrals_org on referrals(org_id);
create index if not exists idx_commissions_org on commissions(org_id);
create index if not exists idx_commissions_deal on commissions(deal_id);

-- ============ ROW LEVEL SECURITY ============
alter table orgs enable row level security;
alter table users enable row level security;
alter table partners enable row level security;
alter table referrals enable row level security;
alter table deals enable row level security;
alter table commissions enable row level security;
alter table payouts enable row level security;

-- Helper: org_id of the current user
create or replace function current_org_id() returns uuid
language sql stable security definer as $$
  select org_id from users where id = auth.uid()
$$;

-- orgs: a user can see/update only their own org
create policy orgs_select on orgs for select using (id = current_org_id());
create policy orgs_update on orgs for update using (id = current_org_id());

-- users: same org
create policy users_select on users for select using (org_id = current_org_id());
create policy users_insert on users for insert with check (org_id = current_org_id());

-- all data tables: scoped by org_id
create policy partners_all on partners for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy referrals_all on referrals for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy deals_all on deals for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy commissions_all on commissions for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy payouts_all on payouts for all using (org_id = current_org_id()) with check (org_id = current_org_id());

-- ============ SIGNUP TRIGGER ============
-- When a user signs up via Supabase Auth, create their org + users row so
-- RLS (current_org_id()) has something to resolve. Without this, the
-- dashboard's "select org_id from users where id = auth.uid()" returns
-- nothing and the app breaks on first login.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_org uuid;
begin
  insert into public.orgs (name)
  values (coalesce(new.raw_user_meta_data->>'org_name', 'My Org'))
  returning id into new_org;

  insert into public.users (id, org_id, email, role)
  values (new.id, new_org, new.email, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
