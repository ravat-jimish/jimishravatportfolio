import React, {useContext, useEffect, useMemo, useState} from "react";
import Fade from "react-reveal/Fade";
import {Link} from "react-router-dom";
import StyleContext from "../../contexts/StyleContext";
import {blogTags, fetchPublishedBlogs, formatBlogDate} from "../../lib/blogs";
import "./BlogHome.scss";

export default function BlogHome() {
  const {isDark} = useContext(StyleContext);
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const pageSize = 6;

  useEffect(() => {
    fetchPublishedBlogs()
      .then(nextBlogs => {
        setBlogs(nextBlogs);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const tags = ["All", ...new Set(blogs.flatMap(blog => blogTags(blog)))];
  const filteredBlogs = useMemo(
    () =>
      selectedTag === "All"
        ? blogs
        : blogs.filter(blog => blogTags(blog).includes(selectedTag)),
    [blogs, selectedTag]
  );
  const featuredBlog = filteredBlogs[0];
  const gridStart = (currentPage - 1) * pageSize + 1;
  const gridBlogs = filteredBlogs.slice(gridStart, gridStart + pageSize);
  const totalPages = Math.max(1, Math.ceil(Math.max(filteredBlogs.length - 1, 0) / pageSize));

  function selectTag(tag) {
    setSelectedTag(tag);
    setCurrentPage(1);
  }

  function changePage(page) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    window.scrollTo(0, 0);
  }

  return (
    <main className={isDark ? "blog-home blog-home-dark" : "blog-home"}>
      <Fade bottom duration={800} distance="20px">
        <section className="blog-home-intro">
          <p className="blog-home-kicker">Writing & ideas</p>
          <h1> The Blog</h1>
          <p className="blog-home-quote">
            Notes on building useful software, thoughtful experiences, and a
            career that keeps me curious.
          </p>
        </section>
      </Fade>

      <nav className="blog-filter" aria-label="Filter articles by tag">
        {tags.map(tag => (
          <button
            className={selectedTag === tag ? "blog-filter-active" : ""}
            key={tag}
            onClick={() => selectTag(tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </nav>

      {isLoading && <p>Loading blogs...</p>}
      {hasError && <p>We could not load the blogs right now.</p>}

      {featuredBlog && (
        <Fade bottom duration={800} distance="20px">
          <article className="blog-featured">
            <div className="blog-featured-image-wrap">
              <img src={featuredBlog.cover_image_url} alt={featuredBlog.title} />
            </div>
            <div className="blog-featured-content">
              <div className="blog-meta">
                <span>{blogTags(featuredBlog)[0]}</span>
                <time dateTime={featuredBlog.published_at}>{formatBlogDate(featuredBlog.published_at)}</time>
              </div>
              <h2>{featuredBlog.title}</h2>
              <p>{featuredBlog.description}</p>
              <Link to={`/blog/${featuredBlog.slug}`}>
                Read article <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </article>
        </Fade>
      )}

      <section className="blog-grid" aria-label="All articles">
        {gridBlogs.map(blog => (
            <article className="blog-tile" key={blog.id}>
              <img src={blog.cover_image_url} alt={blog.title} />
            <div className="blog-tile-body">
              <div className="blog-meta">
                <span>{blogTags(blog)[0]}</span>
                <time dateTime={blog.published_at}>{formatBlogDate(blog.published_at)}</time>
              </div>
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
              <Link to={`/blog/${blog.slug}`}>
                Read article <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <nav className="blog-pagination" aria-label="Blog pagination">
        <button
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          type="button"
        >
          &#8592;
        </button>
        <span>
          {currentPage} <i>/</i> {totalPages}
        </span>
        <button
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
          type="button"
        >
          &#8594;
        </button>
      </nav>
    </main>
  );
}