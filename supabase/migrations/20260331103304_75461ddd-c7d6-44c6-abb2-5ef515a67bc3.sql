
CREATE TABLE public.hostel_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  enrollment_no text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  department text NOT NULL,
  year text NOT NULL,
  hostel_preference text NOT NULL,
  floor_preference text NOT NULL,
  address text,
  distance text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hostel_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.hostel_applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous select" ON public.hostel_applications FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous update" ON public.hostel_applications FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated inserts" ON public.hostel_applications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated select" ON public.hostel_applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update" ON public.hostel_applications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
