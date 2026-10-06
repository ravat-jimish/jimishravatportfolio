import React, {useMemo, useState} from "react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Eye,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Users
} from "lucide-react";
import {contactInfo} from "../../portfolio";
import blogData from "../blogHome/blogData.json";
import "./Admin.scss";

const adminSections = [
  {id: "overview", label: "Overview", icon: LayoutDashboard},
  {id: "blogs", label: "Blogs", icon: BookOpen},
  {id: "users", label: "Users", icon: Users},
  {id: "password", label: "Password", icon: KeyRound}
];

function isPublished(blog) {
  return blog.published !== false && blog.status !== "unpublished";
}

function isPrivate(blog) {
  return Boolean(blog.isPrivate);
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const stats = useMemo(
    () => ({
      total: blogData.length,
      published: blogData.filter(isPublished).length,
      unpublished: blogData.filter(blog => !isPublished(blog)).length,
      privateBlogs: blogData.filter(isPrivate).length,
      publicBlogs: blogData.filter(blog => !isPrivate(blog)).length
    }),
    []
  );
  const activeTabLabel = adminSections.find(
    section => section.id === activeTab
  ).label;

  return (
    <main className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar" aria-label="Admin sections">
          <div className="admin-brand">
            <span className="admin-brand-mark">
              <img alt="" src="/favicon-32x32.png" />
            </span>
            <div>
              <strong>Portfolio</strong>
              <span>Content studio</span>
            </div>
          </div>
          <p className="admin-sidebar-title">Workspace</p>
          <nav className="admin-nav">
            {adminSections.map(section => {
              const SectionIcon = section.icon;
              return (
                <button
                  className={activeTab === section.id ? "active" : ""}
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  type="button"
                >
                  <span className="admin-nav-mark">
                    <SectionIcon size={15} strokeWidth={1.8} />
                  </span>
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="admin-sidebar-footer">
            <span className="admin-status-dot" />
            <span>Portfolio is live</span>
          </div>
        </aside>

        <section className="admin-content">
          <header className="admin-heading">
            <div>
              <p className="admin-eyebrow">Content studio</p>
              <h1>{activeTabLabel}</h1>
              <p>Monitor your blog library and private-content access.</p>
            </div>
            <div className="admin-heading-actions">
              <span className="admin-view-label">{stats.total} blogs</span>
              <span className="admin-avatar">JR</span>
            </div>
          </header>

          {activeTab === "overview" && <Overview stats={stats} />}
          {activeTab === "blogs" && <BlogsTab blogs={blogData} />}
          {activeTab === "users" && (
            <UsersTab privateCount={stats.privateBlogs} />
          )}
          {activeTab === "password" && <PasswordTab />}
        </section>
      </div>
    </main>
  );
};

function StatCard({icon: Icon, label, value, detail, tone}) {
  return (
    <div className={`admin-stat ${tone || ""}`}>
      <div className="admin-stat-topline">
        <strong>{value}</strong>
        <span className="admin-stat-icon">
          <Icon size={17} strokeWidth={1.8} />
        </span>
      </div>
      <span className="admin-stat-label">{label}</span>
      <span className="admin-stat-detail">{detail}</span>
      <span className="admin-stat-trend" aria-hidden="true" />
    </div>
  );
}

function Overview({stats}) {
  const mostRecent = blogData[0];
  return (
    <div className="admin-tab-content">
      <div className="admin-stats admin-blog-stats">
        <StatCard
          icon={BookOpen}
          label="Total blogs"
          value={stats.total}
          detail="In your library"
        />
        <StatCard
          icon={CheckCircle2}
          label="Published"
          value={stats.published}
          detail="Visible in the blog"
          tone="admin-stat-green"
        />
        <StatCard
          icon={BarChart3}
          label="Unpublished"
          value={stats.unpublished}
          detail="Not live yet"
          tone="admin-stat-orange"
        />
        <StatCard
          icon={LockKeyhole}
          label="Private"
          value={stats.privateBlogs}
          detail="Password protected"
          tone="admin-stat-purple"
        />
        <StatCard
          icon={Eye}
          label="Public"
          value={stats.publicBlogs}
          detail="Open to everyone"
          tone="admin-stat-blue"
        />
      </div>
      <div className="admin-main-grid admin-insights-grid">
        <div className="admin-card admin-insight-card">
          <div className="admin-card-header">
            <div>
              <p className="admin-card-kicker">Reach insights</p>
              <h2>Audience overview</h2>
              <p>Connect analytics to track readers and blog reach.</p>
            </div>
            <BarChart3 size={22} />
          </div>
          <div className="admin-empty-insight">
            <Users size={30} />
            <strong>User analytics not connected</strong>
            <span>
              Unique users and reach will appear here once access events are
              stored.
            </span>
          </div>
        </div>
        <div className="admin-card admin-insight-card">
          <div className="admin-card-header">
            <div>
              <p className="admin-card-kicker">Top content</p>
              <h2>Highest reach</h2>
              <p>Ranked by views from your analytics source.</p>
            </div>
            <ArrowUpRight size={20} />
          </div>
          <div className="admin-top-blog">
            <BookOpen size={20} />
            <div>
              <strong>
                {mostRecent ? mostRecent.title : "No blogs available"}
              </strong>
              <span>Reach data not connected</span>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-card admin-source-note">
        <CheckCircle2 size={17} />
        <span>
          Blog counts are read from the current blog library. User and reach
          metrics require a server-side analytics store.
        </span>
      </div>
    </div>
  );
}

function BlogsTab({blogs}) {
  return (
    <div className="admin-card admin-table-card">
      <div className="admin-card-header">
        <div>
          <p className="admin-card-kicker">Blog library</p>
          <h2>All blogs</h2>
          <p>Review publication and access visibility.</p>
        </div>
        <span className="admin-section-count">{blogs.length} blogs</span>
      </div>
      <div className="admin-blog-list">
        {blogs.map(blog => (
          <div className="admin-blog-row" key={blog.id}>
            <div className="admin-blog-title">
              <BookOpen size={17} />
              <div>
                <strong>{blog.title}</strong>
                <span>
                  {blog.dateLabel} · {blog.tag}
                </span>
              </div>
            </div>
            <span
              className={`admin-badge ${
                isPublished(blog) ? "is-published" : "is-unpublished"
              }`}
            >
              {isPublished(blog) ? "Published" : "Unpublished"}
            </span>
            <span
              className={`admin-badge ${
                isPrivate(blog) ? "is-private" : "is-public"
              }`}
            >
              {isPrivate(blog) ? "Private" : "Public"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersTab({privateCount}) {
  return (
    <div className="admin-card admin-empty-tab">
      <Users size={35} />
      <p className="admin-card-kicker">Private access</p>
      <h2>Users with access</h2>
      <strong className="admin-empty-number">Not available</strong>
      <p>
        {privateCount} private {privateCount === 1 ? "blog is" : "blogs are"}{" "}
        currently protected. Add a server-side user store to count people with
        access.
      </p>
      <span>{contactInfo.email_address}</span>
    </div>
  );
}

function PasswordTab() {
  return (
    <div className="admin-card admin-empty-tab">
      <KeyRound size={35} />
      <p className="admin-card-kicker">Access settings</p>
      <h2>Password delivery</h2>
      <p>
        Password requests are handled through the configured password-request
        endpoint. Generated passwords should be created and emailed by the
        server, never in this browser-only dashboard.
      </p>
      <div className="admin-password-status">
        <CheckCircle2 size={17} />
        <span>Endpoint configuration is required</span>
      </div>
      <span>
        Set <strong>REACT_APP_PASSWORD_REQUEST_URL</strong> to enable requests.
      </span>
    </div>
  );
}

export default Admin;
