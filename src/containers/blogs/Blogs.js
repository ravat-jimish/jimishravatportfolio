import React, {useContext, useEffect, useState} from "react";
import Fade from "react-reveal/Fade";
import {Link} from "react-router-dom";
import {blogSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import {blogTags, fetchPublishedBlogs, formatBlogDate} from "../../lib/blogs";
import "../blogHome/BlogHome.scss";

export default function Blogs() {
  const {isDark} = useContext(StyleContext);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchPublishedBlogs()
      .then(blogs => setFeaturedBlogs(blogs.slice(0, 3)))
      .catch(() => setHasError(true));
  }, []);

  if (!blogSection.display) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <main className={isDark ? "blog-home blog-home-dark" : "blog-home"} id="blogs">
        <section className="blog-home-intro">
          <p className="blog-home-kicker">Writing & ideas</p>
          <h1>{blogSection.title}</h1>
          <p className="blog-home-quote">{blogSection.subtitle}</p>
        </section>

        <div className="blog-grid" aria-label="Featured blog articles">
          {hasError && <p>We could not load the blogs right now.</p>}
          {featuredBlogs.map(blog => (
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
        </div>
      </main>
    </Fade>
  );
}
