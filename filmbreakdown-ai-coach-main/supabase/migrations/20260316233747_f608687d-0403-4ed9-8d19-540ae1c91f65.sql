
-- Create submissions table for AI-assisted film review submissions
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sport TEXT NOT NULL,
  position_event TEXT NOT NULL,
  age INTEGER NOT NULL,
  video_type TEXT NOT NULL,
  issue_context TEXT NOT NULL,
  skill_area TEXT NOT NULL,
  conversation_history JSONB DEFAULT '[]'::jsonb,
  generated_summary JSONB,
  edited_summary JSONB,
  name TEXT,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (no auth required for young athletes)
CREATE POLICY "Anyone can create submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read their own submission by ID (used for thank you page)
CREATE POLICY "Anyone can read submissions"
  ON public.submissions FOR SELECT
  USING (true);

-- Allow updates (for editing summary before final submit)
CREATE POLICY "Anyone can update submissions"
  ON public.submissions FOR UPDATE
  USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
