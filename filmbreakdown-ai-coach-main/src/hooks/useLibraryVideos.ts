import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LibraryVideo {
  id: string;
  athlete_id: string;
  title: string;
  skill_category: string;
  video_url: string;
  thumbnail_url: string | null;
  sport: string;
  created_at: string;
}

export function useAthleteLibrary(athleteId: string | undefined) {
  return useQuery({
    queryKey: ["library-videos", athleteId],
    queryFn: async () => {
      if (!athleteId) return [];
      const { data, error } = await supabase
        .from("library_videos")
        .select("*")
        .eq("athlete_id", athleteId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LibraryVideo[];
    },
    enabled: !!athleteId,
  });
}

export function useAllLibraryAthletes() {
  return useQuery({
    queryKey: ["library-athletes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_videos")
        .select("athlete_id, sport");
      if (error) throw error;
      // Get unique athlete IDs that have videos
      const athleteIds = new Set<string>();
      data?.forEach((v: any) => athleteIds.add(v.athlete_id));
      return Array.from(athleteIds);
    },
  });
}

export function useUploadLibraryVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      title,
      skillCategory,
      athleteId,
      sport,
    }: {
      file: File;
      title: string;
      skillCategory: string;
      athleteId: string;
      sport: string;
    }) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `${athleteId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("library-videos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("library-videos")
        .getPublicUrl(filePath);

      const { data, error } = await supabase
        .from("library_videos")
        .insert({
          athlete_id: athleteId,
          title,
          skill_category: skillCategory,
          video_url: urlData.publicUrl,
          sport,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["library-videos", variables.athleteId] });
      queryClient.invalidateQueries({ queryKey: ["library-athletes"] });
    },
  });
}

export function useDeleteLibraryVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, athleteId }: { id: string; athleteId: string }) => {
      const { error } = await supabase
        .from("library_videos")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return athleteId;
    },
    onSuccess: (athleteId) => {
      queryClient.invalidateQueries({ queryKey: ["library-videos", athleteId] });
    },
  });
}
