import {supabase} from "./supabase";

export async function fetchPublishedBlogs() {
  const {data, error} = await supabase
    .from("content_items")
    .select(`
      id,
      slug,
      title,
      description,
      cover_image_url,
      access_type,
      tags,
      reading_time_minutes,
      author_name,
      seo_title,
      seo_description,
      status,
      published_at,
      created_at
    `)
    .eq("content_type", "BLOG")
    .eq("status", "PUBLISHED")
    .order("published_at", {ascending: false});

  if (error) {
    throw error;
  }

  return data || [];
}

export function formatBlogDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString();
}

export function blogTags(blog) {
  return blog.tags && blog.tags.length ? blog.tags : ["Uncategorised"];
}
