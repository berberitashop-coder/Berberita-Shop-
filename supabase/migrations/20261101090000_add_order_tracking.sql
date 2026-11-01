alter table public.orders add column if not exists order_number text;
update public.orders set order_number = 'BR-' || upper(substr(replace(id::text, '-', ''), 1, 8)) where order_number is null;
alter table public.orders alter column order_number set not null;
create unique index if not exists orders_order_number_key on public.orders (order_number);

revoke select on public.orders from anon, authenticated;

drop function if exists public.track_order(text, text);
create or replace function public.track_order(p_order_number text, p_phone text)
returns table (order_number text, status text)
language sql
security definer
set search_path = ''
as $$
  select o.order_number, o.status
  from public.orders o
  where upper(o.order_number) = upper(trim(p_order_number))
    and regexp_replace(o.phone, '[^0-9+]', '', 'g') = regexp_replace(trim(p_phone), '[^0-9+]', '', 'g')
  limit 1;
$$;
revoke all on function public.track_order(text, text) from public;
grant execute on function public.track_order(text, text) to anon, authenticated;
