import { Helmet } from "react-helmet-async";

const SITE_URL = "https://jimishravat.in";

function parseExtraMetadata(value) {
  if (!value) return {};
  if (typeof value === "object") return value;

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function metadataValue(metadata, ...keys) {
  const normalized = Object.entries(metadata).reduce((result, [key, value]) => {
    result[key.toLowerCase().replace(/[^a-z0-9]/g, "")] = value;
    return result;
  }, {});

  return keys
    .map(key => normalized[key.toLowerCase().replace(/[^a-z0-9]/g, "")])
    .find(value => value !== undefined && value !== null && value !== "");
}

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string") {
    return value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }
  return [];
}

export default function BlogSEO({ post }) {
  const metadata = parseExtraMetadata(post.extra_metadata);
  const url = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
  const title = post.seo_title || post.title;

  const description =
    post.seo_description ||
    post.description ||
    metadataValue(metadata, "metaDescription", "excerpt");
  const publishedAt = post.published_at;
  const modifiedAt = post.updated_at || post.created_at || publishedAt;
  const primaryKeyword = metadataValue(metadata, "primary_keyword");
  const secondaryKeywords = toList(
    metadataValue(metadata, "secondary_keywords")
  );
  const articleTags = toList(
    metadataValue(metadata, "article_tags", "tags") || post.tags
  );
  const imageAlt = metadataValue(
    metadata,
    "heroImageAlt",
    "suggestedHeroImageAltText",
    "hero_image_alt",
    "image_alt"
  );
  const searchKeywords = [
    primaryKeyword,
    ...secondaryKeywords,
    ...articleTags
  ].filter(Boolean);
  const targetReader = metadataValue(metadata, "targetAudience", "targetReader");
  const technicalLevel = metadataValue(metadata, "technicalLevel");
  const readingTime = metadataValue(metadata, "estimatedReadingTime");
  const references = Array.isArray(metadata.references)
    ? metadata.references.filter(reference => reference?.url)
    : [];
  const timeRequired = readingTime
    ? `PT${String(readingTime).match(/\d+/)?.[0] || 0}M`
    : undefined;

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
    ...(searchKeywords.length ? {keywords: searchKeywords.join(", ")} : {}),
    ...(targetReader || technicalLevel
      ? {
          audience: {
            "@type": "Audience",
            ...(targetReader ? {audienceType: targetReader} : {}),
            ...(technicalLevel ? {educationalLevel: technicalLevel} : {})
          }
        }
      : {}),
    ...(timeRequired ? {timeRequired} : {}),
    ...(primaryKeyword ? {about: {"@type": "Thing", name: primaryKeyword}} : {}),
    ...(articleTags.length ? {articleSection: articleTags[0]} : {}),
    ...(metadata.articleType ? {genre: metadata.articleType} : {}),
    ...(references.length
      ? {
          citation: references.map(reference => ({
            "@type": "CreativeWork",
            ...(reference.title ? {name: reference.title} : {}),
            url: reference.url
          }))
        }
      : {}),
    ...(post.cover_image_url
      ? {image: [post.cover_image_url]}
      : {}),
  };

  return (
    <Helmet>
      <title>{title} | Jimish Ravat</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <meta name="author" content={post.author_name || "Jimish Ravat"} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Jimish Ravat" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description}
      />
      <meta property="og:url" content={url} />

      {publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}

      {modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}

      {articleTags.map(tag => (
        <meta property="article:tag" content={tag} key={`article-tag-${tag}`} />
      ))}

      {post.cover_image_url && (
        <meta
          property="og:image"
          content={post.cover_image_url}
        />
      )}

      {post.cover_image_url && imageAlt && (
        <meta property="og:image:alt" content={imageAlt} />
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

      {post.cover_image_url && imageAlt && (
        <meta name="twitter:image:alt" content={imageAlt} />
      )}

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}