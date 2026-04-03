export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      breakdowns: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          notes: string | null
          status: string
          submission_id: string
          video_url: string | null
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          submission_id: string
          video_url?: string | null
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          submission_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "breakdowns_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      elite_profiles: {
        Row: {
          achievements: string[] | null
          clip_types: string[] | null
          created_at: string
          custom_achievements: string[] | null
          custom_clip_types: string[] | null
          custom_expertise: string[] | null
          custom_questions: string[] | null
          custom_submission_preferences: string[] | null
          example_questions: string[] | null
          experience_types: string[] | null
          expertise: string[] | null
          full_name: string
          highest_level: string | null
          id: string
          position_id: string
          position_label: string
          profile_image_url: string | null
          public_title: string
          sport: string
          submission_preferences: string[] | null
          updated_at: string
          user_id: string | null
          value_statement: string | null
        }
        Insert: {
          achievements?: string[] | null
          clip_types?: string[] | null
          created_at?: string
          custom_achievements?: string[] | null
          custom_clip_types?: string[] | null
          custom_expertise?: string[] | null
          custom_questions?: string[] | null
          custom_submission_preferences?: string[] | null
          example_questions?: string[] | null
          experience_types?: string[] | null
          expertise?: string[] | null
          full_name: string
          highest_level?: string | null
          id?: string
          position_id: string
          position_label: string
          profile_image_url?: string | null
          public_title: string
          sport?: string
          submission_preferences?: string[] | null
          updated_at?: string
          user_id?: string | null
          value_statement?: string | null
        }
        Update: {
          achievements?: string[] | null
          clip_types?: string[] | null
          created_at?: string
          custom_achievements?: string[] | null
          custom_clip_types?: string[] | null
          custom_expertise?: string[] | null
          custom_questions?: string[] | null
          custom_submission_preferences?: string[] | null
          example_questions?: string[] | null
          experience_types?: string[] | null
          expertise?: string[] | null
          full_name?: string
          highest_level?: string | null
          id?: string
          position_id?: string
          position_label?: string
          profile_image_url?: string | null
          public_title?: string
          sport?: string
          submission_preferences?: string[] | null
          updated_at?: string
          user_id?: string | null
          value_statement?: string | null
        }
        Relationships: []
      }
      library_videos: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          skill_category: string
          sport: string
          thumbnail_url: string | null
          title: string
          video_url: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          skill_category: string
          sport: string
          thumbnail_url?: string | null
          title: string
          video_url: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          skill_category?: string
          sport?: string
          thumbnail_url?: string | null
          title?: string
          video_url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          age: number
          athlete_id: string | null
          conversation_history: Json | null
          created_at: string
          edited_summary: Json | null
          email: string | null
          generated_summary: Json | null
          id: string
          issue_context: string
          name: string | null
          position_event: string
          skill_area: string
          sport: string
          status: string
          updated_at: string
          user_id: string | null
          video_type: string
          video_url: string | null
        }
        Insert: {
          age: number
          athlete_id?: string | null
          conversation_history?: Json | null
          created_at?: string
          edited_summary?: Json | null
          email?: string | null
          generated_summary?: Json | null
          id?: string
          issue_context: string
          name?: string | null
          position_event: string
          skill_area: string
          sport: string
          status?: string
          updated_at?: string
          user_id?: string | null
          video_type: string
          video_url?: string | null
        }
        Update: {
          age?: number
          athlete_id?: string | null
          conversation_history?: Json | null
          created_at?: string
          edited_summary?: Json | null
          email?: string | null
          generated_summary?: Json | null
          id?: string
          issue_context?: string
          name?: string | null
          position_event?: string
          skill_area?: string
          sport?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          video_type?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "elite_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "youth_athlete" | "elite_athlete" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["youth_athlete", "elite_athlete", "admin"],
    },
  },
} as const
