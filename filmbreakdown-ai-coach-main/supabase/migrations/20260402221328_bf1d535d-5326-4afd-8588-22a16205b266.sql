
-- Phase 1: Auth infrastructure

-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('youth_athlete', 'elite_athlete', 'admin');

-- 2. Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- 3. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- 4. Create has_role() security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 5. Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Phase 2: Schema updates

-- 6. Add columns to submissions
ALTER TABLE public.submissions
  ADD COLUMN user_id UUID,
  ADD COLUMN athlete_id UUID REFERENCES public.elite_profiles(id),
  ADD COLUMN video_url TEXT;

-- 7. Add user_id to elite_profiles
ALTER TABLE public.elite_profiles
  ADD COLUMN user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL;

-- 8. Create breakdowns table
CREATE TABLE public.breakdowns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES public.submissions(id),
  athlete_id UUID NOT NULL,
  video_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.breakdowns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read breakdowns"
  ON public.breakdowns FOR SELECT TO public
  USING (true);

CREATE POLICY "Authenticated users can insert breakdowns"
  ON public.breakdowns FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update breakdowns"
  ON public.breakdowns FOR UPDATE TO authenticated
  USING (true);

-- 9. Tighten submissions RLS
DROP POLICY IF EXISTS "Anyone can create submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anyone can read submissions" ON public.submissions;
DROP POLICY IF EXISTS "Anyone can update submissions" ON public.submissions;

CREATE POLICY "Authenticated users can create submissions"
  ON public.submissions FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own submissions"
  ON public.submissions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'elite_athlete') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read submissions temporarily"
  ON public.submissions FOR SELECT TO anon
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON public.submissions FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- 10. Tighten elite_profiles RLS (keep public read, restrict update)
DROP POLICY IF EXISTS "Anyone can insert elite profiles" ON public.elite_profiles;
DROP POLICY IF EXISTS "Anyone can update elite profiles" ON public.elite_profiles;

CREATE POLICY "Authenticated users can insert elite profiles"
  ON public.elite_profiles FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Owner can update elite profile"
  ON public.elite_profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid());
