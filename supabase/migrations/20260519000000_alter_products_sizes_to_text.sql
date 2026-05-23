-- Convert products.sizes from integer[] to text[] to support labels like 'M', 'L', 'XL'
BEGIN;

-- Add a new temporary text[] column
ALTER TABLE public.products ADD COLUMN sizes_text text[];

-- Copy existing integer sizes into the new text array column
UPDATE public.products SET sizes_text = (SELECT array_agg(s::text) FROM unnest(sizes) AS s);

-- Drop old integer sizes column
ALTER TABLE public.products DROP COLUMN sizes;

-- Rename the temporary column to sizes
ALTER TABLE public.products RENAME COLUMN sizes_text TO sizes;

COMMIT;
