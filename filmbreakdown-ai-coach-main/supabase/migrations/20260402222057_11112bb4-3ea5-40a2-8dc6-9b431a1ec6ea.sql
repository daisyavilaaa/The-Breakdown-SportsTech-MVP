
-- Remove old permissive library_videos policies
DROP POLICY IF EXISTS "Anyone can insert library videos" ON public.library_videos;
DROP POLICY IF EXISTS "Anyone can delete library videos" ON public.library_videos;

-- Library videos: only elite athletes can insert/delete their own
CREATE POLICY "Elite athletes can insert library videos"
  ON public.library_videos FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'elite_athlete'));

CREATE POLICY "Elite athletes can delete own library videos"
  ON public.library_videos FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'elite_athlete'));

-- Tighten breakdowns: replace permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert breakdowns" ON public.breakdowns;
DROP POLICY IF EXISTS "Authenticated users can update breakdowns" ON public.breakdowns;
DROP POLICY IF EXISTS "Anyone can read breakdowns" ON public.breakdowns;

CREATE POLICY "Elite athletes can insert own breakdowns"
  ON public.breakdowns FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'elite_athlete'));

CREATE POLICY "Elite athletes can update own breakdowns"
  ON public.breakdowns FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'elite_athlete'));

CREATE POLICY "Users can read relevant breakdowns"
  ON public.breakdowns FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'elite_athlete')
    OR submission_id IN (SELECT id FROM public.submissions WHERE user_id = auth.uid())
  );

-- Tighten submissions insert to require user_id = auth.uid()
DROP POLICY IF EXISTS "Authenticated users can create submissions" ON public.submissions;
CREATE POLICY "Authenticated users can create own submissions"
  ON public.submissions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
