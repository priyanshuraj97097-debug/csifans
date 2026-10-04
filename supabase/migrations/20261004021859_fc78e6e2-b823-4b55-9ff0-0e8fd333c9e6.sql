CREATE OR REPLACE FUNCTION public.is_csi_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = auth.uid()
      AND lower(u.email) = 'csifans.official@gmail.com'
      AND u.email_confirmed_at IS NOT NULL
  )
$$;
REVOKE ALL ON FUNCTION public.is_csi_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.is_csi_admin() TO anon, authenticated;

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_slug text NOT NULL,
  slug text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (category_slug, slug)
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published" ON public.products FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Admin reads all" ON public.products FOR SELECT TO authenticated USING (public.is_csi_admin());
CREATE POLICY "Admin inserts" ON public.products FOR INSERT TO authenticated WITH CHECK (public.is_csi_admin());
CREATE POLICY "Admin updates" ON public.products FOR UPDATE TO authenticated USING (public.is_csi_admin()) WITH CHECK (public.is_csi_admin());
CREATE POLICY "Admin deletes" ON public.products FOR DELETE TO authenticated USING (public.is_csi_admin());

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE POLICY "Admin reads product images" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'product-images' AND public.is_csi_admin());
CREATE POLICY "Admin uploads product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images' AND public.is_csi_admin());
CREATE POLICY "Admin updates product images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images' AND public.is_csi_admin());
CREATE POLICY "Admin deletes product images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images' AND public.is_csi_admin());