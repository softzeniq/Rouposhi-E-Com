ALTER TABLE public.site_settings 
  ADD COLUMN tiktok_pixel_id text DEFAULT '',
  ADD COLUMN tiktok_pixel_enabled boolean DEFAULT false,
  ADD COLUMN tiktok_access_token text DEFAULT '';