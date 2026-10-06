// src/lib/supabase.ts

import {
  createClient
} from "@supabase/supabase-js";

function requiredEnv(
  name: "REACT_APP_SUPABASE_URL" | "REACT_APP_SUPABASE_PUBLISHABLE_KEY"
): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const supabase =
  createClient(
    requiredEnv("REACT_APP_SUPABASE_URL"),

    requiredEnv("REACT_APP_SUPABASE_PUBLISHABLE_KEY")
  );

export const supabaseUrl = requiredEnv("REACT_APP_SUPABASE_URL");

export const supabasePublishableKey = requiredEnv(
  "REACT_APP_SUPABASE_PUBLISHABLE_KEY"
);