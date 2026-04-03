
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('submission-videos', 'submission-videos', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('breakdown-videos', 'breakdown-videos', false);

-- Submission videos policies
CREATE POLICY "Authenticated users can upload submission videos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'submission-videos');

CREATE POLICY "Anyone can view submission videos"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'submission-videos');

-- Breakdown videos policies
CREATE POLICY "Authenticated users can upload breakdown videos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'breakdown-videos');

CREATE POLICY "Anyone can view breakdown videos"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'breakdown-videos');
