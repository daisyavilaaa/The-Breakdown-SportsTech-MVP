
-- Create storage bucket for library videos
INSERT INTO storage.buckets (id, name, public) VALUES ('library-videos', 'library-videos', true);

-- Create library_videos table
CREATE TABLE public.library_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id TEXT NOT NULL,
  title TEXT NOT NULL,
  skill_category TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  sport TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.library_videos ENABLE ROW LEVEL SECURITY;

-- Anyone can read library videos
CREATE POLICY "Anyone can read library videos"
ON public.library_videos FOR SELECT
TO public
USING (true);

-- Anyone can insert library videos (no auth yet)
CREATE POLICY "Anyone can insert library videos"
ON public.library_videos FOR INSERT
TO public
WITH CHECK (true);

-- Anyone can delete library videos (no auth yet)
CREATE POLICY "Anyone can delete library videos"
ON public.library_videos FOR DELETE
TO public
USING (true);

-- Storage RLS policies
CREATE POLICY "Anyone can upload library videos"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'library-videos');

CREATE POLICY "Anyone can read library videos storage"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'library-videos');

CREATE POLICY "Anyone can delete library videos storage"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'library-videos');
