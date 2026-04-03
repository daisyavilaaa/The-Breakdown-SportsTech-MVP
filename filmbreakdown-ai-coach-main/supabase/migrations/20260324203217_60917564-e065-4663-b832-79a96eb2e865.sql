
CREATE TABLE public.elite_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  sport text NOT NULL DEFAULT 'Football',
  position_id text NOT NULL,
  position_label text NOT NULL,
  public_title text NOT NULL,
  value_statement text,
  highest_level text,
  experience_types text[] DEFAULT '{}',
  achievements text[] DEFAULT '{}',
  custom_achievements text[] DEFAULT '{}',
  expertise text[] DEFAULT '{}',
  custom_expertise text[] DEFAULT '{}',
  clip_types text[] DEFAULT '{}',
  custom_clip_types text[] DEFAULT '{}',
  example_questions text[] DEFAULT '{}',
  custom_questions text[] DEFAULT '{}',
  submission_preferences text[] DEFAULT '{}',
  custom_submission_preferences text[] DEFAULT '{}',
  profile_image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.elite_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read elite profiles"
  ON public.elite_profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert elite profiles"
  ON public.elite_profiles FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update elite profiles"
  ON public.elite_profiles FOR UPDATE
  TO public
  USING (true);

CREATE TRIGGER update_elite_profiles_updated_at
  BEFORE UPDATE ON public.elite_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
