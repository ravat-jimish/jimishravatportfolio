import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import StyleContext from "../../contexts/StyleContext";
import {withAccessContent} from "../../components/accessContent/AccessContent";
import blogData from "./blogData.json";
import "./BlogArticle.scss";

export default function BlogArticle() {
  const {isDark} = useContext(StyleContext);
  const {slug} = useParams();
  const blog = blogData.find(article => article.slug === slug);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(blog));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!blog) {
      return;
    }

    setIsLoading(true);
    fetch(blog.markdownPath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Article could not be loaded");
        }
        return response.text();
      })
      .then(markdown => {
        setContent(markdown);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [blog]);

  if (!blog) {
    return (
      <main className={isDark ? "blog-article blog-article-dark" : "blog-article"}>
        <Link className="blog-back-link" to="/blog">&#8592; Back to all blogs</Link>
        <h1>Article not found</h1>
        <p>The article you are looking for does not exist.</p>
      </main>
    );
  }

  const relatedBlogs = blogData
    .filter(article => article.tag === blog.tag && article.slug !== blog.slug)
    .slice(0, 3);

  return (
    <main className={isDark ? "blog-article blog-article-dark" : "blog-article"}>
      <Link className="blog-back-link" to="/blog">&#8592; Back to all blogs</Link>
      <header className="blog-article-header">
        <div className="blog-meta">
          <span>{blog.tag}</span>
          <time dateTime={blog.date}>{blog.dateLabel}</time>
        </div>
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
      </header>
      <img className="blog-article-cover" src={blog.image} alt={blog.imageAlt} />
      <div className="blog-article-layout">
        <article className="blog-article-content">
          {isLoading && <p>Loading article...</p>}
          {hasError && <p>We could not load this article right now.</p>}
          {!isLoading && !hasError && (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </article>
      </div>
      {relatedBlogs.length > 0 && (
        <section className="blog-related">
          <p className="blog-home-kicker">Keep reading</p>
          <h2>More from {blog.tag}</h2>
          <div className="blog-related-grid">
            {relatedBlogs.map(relatedBlog => (
              <Link
                className="blog-related-card"
                key={relatedBlog.id}
                to={`/blog/${relatedBlog.slug}`}
              >
                <img src={relatedBlog.image} alt={relatedBlog.imageAlt} />
                <div>
                  <div className="blog-meta">
                    <span>{relatedBlog.tag}</span>
                    <time dateTime={relatedBlog.date}>{relatedBlog.dateLabel}</time>
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