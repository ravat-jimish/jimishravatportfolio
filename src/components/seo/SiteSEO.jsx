import {Helmet} from "react-helmet-async";

const SITE_URL = "https://jimishravat.in";
const DEFAULT_DESCRIPTION =
  "Jimish Ravat is a software developer building thoughtful web applications with React, Node.js, APIs, and modern cloud technologies.";

export default function SiteSEO({pathname}) {
  const isBlogIndex = pathname === "/blog";
  const title = isBlogIndex
    ? "The Blog | Jimish Ravat"
    : "Jimish Ravat | Software Developer";
  const description = isBlogIndex
    ? "Notes from Jimish Ravat on useful software, thoughtful user experiences, React, Node.js, APIs, and building products that last."
    : DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${isBlogIndex ? "/blog" : "/"}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Jimish Ravat",
        url: SITE_URL,
        jobTitle: "Software Developer",
        sameAs: [
          "https://github.com/jimishravat",
          "https://www.linkedin.com/in/jimishravat/",
          "https://medium.com/@jimishravat2802"
        ]
      },
      {
        "@type": isBlogIndex ? "CollectionPage" : "WebSite",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        ...(isBlogIndex ? {isPartOf: {"@id": `${SITE_URL}/#website`}} : {})
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Jimish Ravat",
        description: DEFAULT_DESCRIPTION,
        publisher: {"@id": `${SITE_URL}/#person`}
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Jimish Ravat" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="Jimish Ravat" />
      <meta property="og:type" content={isBlogIndex ? "website" : "profile"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}