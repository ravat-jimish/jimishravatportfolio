import { Helmet } from "react-helmet-async";

const SITE_URL = "https://jimishravat.in";

export default function BlogSEO({ post }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = post.seo_title || post.title;

  const description = post.seo_description || post.description;
  const publishedAt = post.published_at;
  const modifiedAt = post.updated_at || post.created_at || publishedAt;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: "Jimish Ravat",
      url: SITE_URL,
    },
    datePublished: publishedAt,
    dateModified: modifiedAt,
    ...(post.cover_image_url
      ? {image: [post.cover_image_url]}
      : {}),
  };

  return (
    <Helmet>
      <title>{title} | Jimish Ravat</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description}
      />
      <meta property="og:url" content={url} />

      {post.cover_image_url && (
        <meta
          property="og:image"
          content={post.cover_image_url}
        />
      )}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        content={description}
      />

      {post.cover_image_url && (
        <meta
          name="twitter:image"
          content={post.cover_image_url}
        />
      )}

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}