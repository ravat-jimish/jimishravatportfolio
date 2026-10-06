import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import StyleContext from "../../contexts/StyleContext";
import {
  getPrivateAccessHeaders,
  invokeEdgeFunction
} from "../../lib/edgeFunctions";
import {blogTags, fetchPublishedBlogs, formatBlogDate} from "../../lib/blogs";
import {withAccessContent} from "../../components/accessContent/AccessContent";
import "./BlogArticle.scss";

export default function BlogArticle() {
  const {isDark} = useContext(StyleContext);
  const {slug} = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [requiresAccess, setRequiresAccess] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    setHasError(false);
    setRequiresAccess(false);

    async function loadArticle() {
      try {
        const blogs = await fetchPublishedBlogs();
        const currentBlog = blogs.find(article => article.slug === slug);

        if (!currentBlog) {
          if (isCurrent) {
            setBlog(null);
            setRelatedBlogs([]);
          }
          return;
        }

        if (isCurrent) {
          setBlog(currentBlog);
          setRelatedBlogs(
            blogs
              .filter(article =>
                blogTags(article).some(tag =>
                  blogTags(currentBlog).includes(tag)
                ) && article.slug !== currentBlog.slug
              )
              .slice(0, 3)
          );
        }

        const access = await invokeEdgeFunction(
          `check-access?slug=${encodeURIComponent(currentBlog.slug)}`,
          {
            headers: getPrivateAccessHeaders(),
            method: "GET"
          }
        );

        if (!access.authorized) {
          if (isCurrent) {
            setRequiresAccess(true);
          }
          return;
        }

        const result = await invokeEdgeFunction(
          `content?slug=${encodeURIComponent(currentBlog.slug)}`,
          {
            headers: getPrivateAccessHeaders(),
            method: "GET"
          }
        );
        const articleContent = result.content || {};

        if (articleContent.markdown) {
          if (isCurrent) {
            setContent(articleContent.markdown);
          }
          return;
        }

        if (articleContent.externalUrl) {
          const response = await fetch(articleContent.externalUrl);
          if (!response.ok) {
            throw new Error("Article could not be loaded");
          }
          const markdown = await response.text();
          if (isCurrent) {
            setContent(markdown);
          }
          return;
        }

        throw new Error("Article content is unavailable");
      } catch (error) {
        if (isCurrent) {
          setHasError(true);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      isCurrent = false;
    };
  }, [slug]);

  if (!blog) {
    if (isLoading) {
      return (
        <main className={isDark ? "blog-article blog-article-dark" : "blog-article"}>
          <p>Loading article...</p>
        </main>
      );
    }

    return (
      <main className={isDark ? "blog-article blog-article-dark" : "blog-article"}>
        <Link className="blog-back-link" to="/blog">&#8592; Back to all blogs</Link>
        <h1>Article not found</h1>
        <p>The article you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className={isDark ? "blog-article blog-article-dark" : "blog-article"}>
      <Link className="blog-back-link" to="/blog">&#8592; Back to all blogs</Link>
      <header className="blog-article-header">
        <div className="blog-meta">
          <span>{blogTags(blog)[0]}</span>
          <time dateTime={blog.published_at}>{formatBlogDate(blog.published_at)}</time>
        </div>
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
      </header>
      <img className="blog-article-cover" src={blog.cover_image_url} alt={blog.title} />
      <div className="blog-article-layout">
        <article className="blog-article-content">
          {requiresAccess && (
            <>
              <h2>Private article</h2>
              <p>This article is available to approved readers.</p>
              <Link
                className="blog-back-link"
                to={`/accessContent?redirect=${encodeURIComponent(
                  `/blog/${blog.slug}`
                )}`}
              >
                Request access or sign in
              </Link>
            </>
          )}
          {isLoading && <p>Loading article...</p>}
          {hasError && !requiresAccess && (
            <p>We could not load this article right now.</p>
          )}
          {!isLoading && !hasError && !requiresAccess && (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </article>
      </div>
      {relatedBlogs.length > 0 && (
        <section className="blog-related">
          <p className="blog-home-kicker">Keep reading</p>
          <h2>More from {blogTags(blog)[0]}</h2>
          <div className="blog-related-grid">
            {relatedBlogs.map(relatedBlog => (
              <Link
                className="blog-related-card"
                key={relatedBlog.id}
                to={`/blog/${relatedBlog.slug}`}
              >
                <img src={relatedBlog.cover_image_url} alt={relatedBlog.title} />
                <div>
                  <div className="blog-meta">
                    <span>{blogTags(relatedBlog)[0]}</span>
                    <time dateTime={relatedBlog.published_at}>{formatBlogDate(relatedBlog.published_at)}</time>
                  </div>
                  <h3>{relatedBlog.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export const AccessControlledBlogArticle = withAccessContent(BlogArticle);