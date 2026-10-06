import {createClient} from "@supabase/supabase-js";

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const supabaseUrl = requiredEnv("REACT_APP_SUPABASE_URL");
export const supabasePublishableKey = requiredEnv(
  "REACT_APP_SUPABASE_PUBLISHABLE_KEY"
);

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
