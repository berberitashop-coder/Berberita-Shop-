create table if not exists public.exchange_rates (
  currency text primary key check (currency in ('USD', 'EUR', 'CNY')),
  rate_dzd numeric not null check (rate_dzd > 0),
  updated_at timestamptz not null default now(),
  source text not null default 'manual' check (source in ('manual', 'auto'))
);

alter table public.exchange_rates enable row level security;
drop policy if exists exchange_rates_public_read on public.exchange_rates;
create policy exchange_rates_public_read on public.exchange_rates for select to anon, authenticated using (true);

drop trigger if exists exchange_rates_updated_at on public.exchange_rates;
create or replace function public.set_exchange_rates_updated_at()
returns trigger language plpgsql security invoker set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;
create trigger exchange_rates_updated_at before update on public.exchange_rates
for each row execute function public.set_exchange_rates_updated_at();

-- TODO(propriétaire): confirmer les taux et les insérer manuellement depuis le tableau de bord Supabase.
-- Exemple uniquement, ne pas exécuter sans remplacer les valeurs :
-- insert into public.exchange_rates (currency, rate_dzd, source) values
-- ('USD', 000.00, 'manual'), ('EUR', 000.00, 'manual'), ('CNY', 000.00, 'manual');
