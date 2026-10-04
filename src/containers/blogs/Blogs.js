import React, {useContext, useState} from "react";
import Fade from "react-reveal/Fade";
import {Link} from "react-router-dom";
import {blogSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import blogData from "../blogHome/blogData.json";
import "../blogHome/BlogHome.scss";

function chooseRandomBlogs(blogs, count) {
  return [...blogs]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

export default function Blogs() {
  const {isDark} = useContext(StyleContext);
  const [featuredBlogs] = useState(() => chooseRandomBlogs(blogData, 3));

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
          {featuredBlogs.map(blog => (
            <article className="blog-tile" key={blog.id}>
              <img src={blog.image} alt={blog.imageAlt} />
              <div className="blog-tile-body">
                <div className="blog-meta">
                  <span>{blog.tag}</span>
                  <time dateTime={blog.date}>{blog.dateLabel}</time>
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
