import React, {useCallback, useEffect, useState} from "react";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Edit3,
  Eye,
  Globe2,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users
} from "lucide-react";
import {invokeAuthenticatedFunction} from "../../lib/edgeFunctions";
import {supabase} from "../../lib/supabase";
import {useLocation} from "react-router-dom";
import "./Admin.scss";

const adminSections = [
  {id: "overview", label: "Overview", icon: LayoutDashboard},
  {id: "requests", label: "Requests", icon: KeyRound},
  {id: "blogs", label: "Blogs", icon: BookOpen},
  {id: "users", label: "Users", icon: Users}
];

const emptySummary = {
  pendingRequests: 0,
  activeGrants: 0,
  successfulViews: 0,
  recipients: 0,
  activeSessions: 0,
  passwordFailures: 0
};

function isPublished(blog) {
  return blog.status === "PUBLISHED";
}

function isPrivate(blog) {
  return blog.access_type === "PRIVATE";
}

function formatDate(value) {
  if (!value) return "Not published";
  return new Date(value).toLocaleDateString();
}

function errorMessage(error) {
  if (error?.payload?.error === "ADMIN_REQUIRED") {
    return "This account is not registered as an administrator.";
  }
  if (error?.payload?.error === "AUTH_REQUIRED") {
    return "Your admin session has expired. Please sign in again.";
  }
  return "The admin service could not complete that request.";
}

export default function Admin() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [summary, setSummary] = useState(emptySummary);
  const [topContent, setTopContent] = useState([]);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadAdminData = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError("");
    try {
      const [analytics, requestData, contentResult] = await Promise.all([
        invokeAuthenticatedFunction("admin-analytics"),
        invokeAuthenticatedFunction("admin-requests?status=PENDING", {method: "GET"}),
        invokeAuthenticatedFunction("admin-content", {method: "GET"})
      ]);
      setSummary(analytics.summary || emptySummary);
      setTopContent(analytics.topContent || []);
      setUsers(analytics.users || []);
      setRequests(requestData.requests || []);
      setContentItems(contentResult.contents || []);
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({data: {session: currentSession}}) => {
      if (mounted) {
        setSession(currentSession);
        setCheckingSession(false);
      }
    });
    const {data: listener} = supabase.auth.onAuthStateChange(
      (_event, currentSession) => setSession(currentSession)
    );
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  useEffect(() => {
    if (new URLSearchParams(location.search).has("requestId")) {
      setActiveTab("requests");
    }
  }, [location.search]);

  if (checkingSession) {
    return <main className="admin-page"><p className="admin-loading">Checking admin session...</p></main>;
  }

  if (!session) {
    return <AdminLogin onSignedIn={setSession} />;
  }

  const localStats = {
    total: contentItems.length,
    published: contentItems.filter(isPublished).length,
    privateBlogs: contentItems.filter(isPrivate).length
  };
  const activeSection = adminSections.find(section => section.id === activeTab);

  async function approveRequest(requestId) {
    setError("");
    setNotice("");
    try {
      const result = await invokeAuthenticatedFunction("admin-approve", {
        body: {requestId, expiresInDays: 30, maxDevices: 1}
      });
      setNotice(result.emailSent ? "Access approved and email sent." : "Access approved, but email delivery failed.");
      await loadAdminData();
    } catch (requestError) {
      setError(errorMessage(requestError));
    }
  }

  async function saveBlog(formData) {
    setError("");
    setNotice("");
    try {
      await invokeAuthenticatedFunction("admin-save-content", {
        body: formData
      });
      setNotice("Blog saved successfully.");
      await loadAdminData();
    } catch (saveError) {
      setError(errorMessage(saveError));
      throw saveError;
    }
  }

  async function deleteBlog(contentId) {
    if (!window.confirm("Delete this blog permanently?")) return;
    setError("");
    setNotice("");
    try {
      await invokeAuthenticatedFunction("admin-content", {
        body: {contentId},
        method: "DELETE"
      });
      setNotice("Blog deleted successfully.");
      await loadAdminData();
    } catch (deleteError) {
      setError(errorMessage(deleteError));
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <main className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar" aria-label="Admin sections">
          <div className="admin-brand"><span className="admin-brand-mark"><img alt="" src="/favicon-32x32.png" /></span><div><strong>Portfolio</strong><span>Content studio</span></div></div>
          <p className="admin-sidebar-title">Workspace</p>
          <nav className="admin-nav">
            {adminSections.map(section => {
              const Icon = section.icon;
              return <button className={activeTab === section.id ? "active" : ""} key={section.id} onClick={() => setActiveTab(section.id)} type="button"><span className="admin-nav-mark"><Icon size={15} strokeWidth={1.8} /></span><span>{section.label}</span></button>;
            })}
          </nav>
          <div className="admin-sidebar-footer"><span className="admin-status-dot" /><span>Admin session active</span></div>
          <button className="admin-signout" onClick={signOut} type="button"><LogOut size={15} /> Sign out</button>
        </aside>
        <section className="admin-content">
          <header className="admin-heading"><div><p className="admin-eyebrow">Content studio</p><h1>{activeSection.label}</h1><p>Monitor your blog library and private-content access.</p></div><div className="admin-heading-actions"><button className="admin-icon-button" onClick={loadAdminData} title="Refresh data" type="button"><RefreshCw size={16} /></button><span className="admin-view-label">{summary.pendingRequests} pending</span><span className="admin-avatar">JR</span></div></header>
          {error && <p className="admin-feedback admin-feedback-error" role="alert">{error}</p>}
          {notice && <p className="admin-feedback admin-feedback-success" role="status">{notice}</p>}
          {loading && <p className="admin-loading">Refreshing secure data...</p>}
          {activeTab === "overview" && <Overview summary={summary} topContent={topContent} localStats={localStats} />}
          {activeTab === "requests" && <RequestsTab requests={requests} onApprove={approveRequest} />}
          {activeTab === "blogs" && <BlogsTab blogs={contentItems} onDelete={deleteBlog} onSave={saveBlog} />}
          {activeTab === "users" && <UsersTab summary={summary} users={users} />}
        </section>
      </div>
    </main>
  );
}

function AdminLogin({onSignedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const {data, error: signInError} = await supabase.auth.signInWithPassword({email, password});
    if (signInError) setError("The email or password is not recognised.");
    else onSignedIn(data.session);
    setLoading(false);
  }

  return <main className="admin-page"><section className="admin-card admin-auth-card"><ShieldCheck size={34} /><p className="admin-card-kicker">Secure workspace</p><h1>Admin sign in</h1><p>Use your Supabase Auth account to manage private-content access.</p><form onSubmit={submit}><label htmlFor="admin-email">Email address</label><input id="admin-email" onChange={event => setEmail(event.target.value)} required type="email" value={email} /><label htmlFor="admin-password">Password</label><input id="admin-password" onChange={event => setPassword(event.target.value)} required type="password" value={password} />{error && <p className="admin-feedback admin-feedback-error" role="alert">{error}</p>}<button disabled={loading} type="submit">{loading ? "Signing in..." : "Sign in"}</button></form></section></main>;
}

function StatCard({icon: Icon, label, value, detail, tone}) {
  return <div className={`admin-stat ${tone || ""}`}><div className="admin-stat-topline"><strong>{value}</strong><span className="admin-stat-icon"><Icon size={17} strokeWidth={1.8} /></span></div><span className="admin-stat-label">{label}</span><span className="admin-stat-detail">{detail}</span></div>;
}

function Overview({summary, topContent, localStats}) {
  return <div className="admin-tab-content"><div className="admin-stats admin-blog-stats"><StatCard icon={BookOpen} label="Total blogs" value={localStats.total} detail="In your library" /><StatCard icon={CheckCircle2} label="Published" value={localStats.published} detail="Visible in the blog" tone="admin-stat-green" /><StatCard icon={KeyRound} label="Pending requests" value={summary.pendingRequests} detail="Need review" tone="admin-stat-orange" /><StatCard icon={LockKeyhole} label="Active grants" value={summary.activeGrants} detail="Private access" tone="admin-stat-purple" /><StatCard icon={Eye} label="Successful views" value={summary.successfulViews} detail="Recorded by server" tone="admin-stat-blue" /></div><div className="admin-main-grid admin-insights-grid"><div className="admin-card admin-insight-card"><div className="admin-card-header"><div><p className="admin-card-kicker">Reach insights</p><h2>Audience overview</h2><p>Events are recorded by the content Edge Function.</p></div><BarChart3 size={22} /></div><div className="admin-metric-list"><span><strong>{summary.recipients}</strong> recipients</span><span><strong>{summary.activeSessions}</strong> active sessions</span><span><strong>{summary.passwordFailures}</strong> failed attempts</span></div></div><div className="admin-card admin-insight-card"><div className="admin-card-header"><div><p className="admin-card-kicker">Top content</p><h2>Highest reach</h2><p>Ranked by successful views.</p></div></div>{topContent.length ? topContent.slice(0, 3).map(item => <div className="admin-top-blog" key={item.content?.id}><BookOpen size={20} /><div><strong>{item.content?.title || "Untitled content"}</strong><span>{item.views} views</span></div></div>) : <div className="admin-empty-insight"><Users size={30} /><strong>No views recorded yet</strong><span>Successful views will appear here.</span></div>}</div></div><div className="admin-card admin-source-note"><CheckCircle2 size={17} /><span>Analytics and access counts are read from the secured Supabase service.</span></div></div>;
}

function RequestsTab({requests, onApprove}) {
  return <div className="admin-card admin-table-card"><div className="admin-card-header"><div><p className="admin-card-kicker">Private access</p><h2>Pending requests</h2><p>Approve a request to generate and email an article-specific credential.</p></div><span className="admin-section-count">{requests.length} pending</span></div>{requests.length ? <div className="admin-request-list">{requests.map(request => <div className="admin-request-row" key={request.id}><div><strong>{request.content?.title || "Unknown article"}</strong><span>{request.email}</span><small>{new Date(request.requested_at).toLocaleString()}</small></div><button className="admin-action-button" onClick={() => onApprove(request.id)} type="button">Approve</button></div>)}</div> : <div className="admin-empty-insight"><CheckCircle2 size={28} /><strong>No pending requests</strong><span>New private-content requests will appear here.</span></div>}</div>;
}

function BlogEditor({blog, onCancel, onSave}) {
  const [form, setForm] = useState({
    accessType: blog?.access_type || "PUBLIC",
    authorName: blog?.author_name || "",
    coverImageUrl: blog?.cover_image_url || "",
    description: blog?.description || "",
    readingTimeMinutes: blog?.reading_time_minutes || "",
    seoDescription: blog?.seo_description || "",
    seoTitle: blog?.seo_title || "",
    slug: blog?.slug || "",
    status: blog?.status || "DRAFT",
    tags: (blog?.tags || []).join(", "),
    title: blog?.title || ""
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    setForm({...form, [event.target.name]: event.target.value});
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, key === "tags" ? JSON.stringify(value.split(",").map(tag => tag.trim()).filter(Boolean)) : value);
    });
    if (file) payload.append("file", file);
    try {
      await onSave(payload);
      onCancel();
    } finally {
      setSaving(false);
    }
  }

  return <form className="admin-card admin-blog-editor" onSubmit={submit}><div className="admin-card-header"><div><p className="admin-card-kicker">{blog ? "Edit blog" : "New blog"}</p><h2>{blog ? "Update blog" : "Create a blog"}</h2><p>Required fields are marked in the form.</p></div><button className="admin-icon-button" onClick={onCancel} title="Close editor" type="button"><span aria-hidden="true">×</span></button></div><div className="admin-editor-grid"><label>Title<input name="title" onChange={updateField} required value={form.title} /></label><label>Slug<input name="slug" onChange={updateField} placeholder="Generated from title if empty" value={form.slug} /></label><label className="admin-editor-wide">Description<textarea name="description" onChange={updateField} rows="3" value={form.description} /></label><label>Access<select name="accessType" onChange={updateField} value={form.accessType}><option value="PUBLIC">Public</option><option value="PRIVATE">Private</option></select></label><label>Status<select name="status" onChange={updateField} value={form.status}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option><option value="ARCHIVED">Archived</option></select></label><label>Tags<input name="tags" onChange={updateField} placeholder="Design, Product" value={form.tags} /></label><label>Reading time (minutes)<input min="1" name="readingTimeMinutes" onChange={updateField} type="number" value={form.readingTimeMinutes} /></label><label>Author name<input name="authorName" onChange={updateField} value={form.authorName} /></label><label>Cover image URL<input name="coverImageUrl" onChange={updateField} type="url" value={form.coverImageUrl} /></label><label className="admin-editor-wide">Markdown file<input accept=".md,text/markdown" onChange={event => setFile(event.target.files[0] || null)} type="file" /></label></div><div className="admin-editor-actions"><button className="admin-action-button" disabled={saving} type="submit">{saving ? "Saving..." : "Save blog"}</button><button className="admin-secondary-button" onClick={onCancel} type="button">Cancel</button></div></form>;
}

function BlogsTab({blogs, onDelete, onSave}) {
  const [editingBlog, setEditingBlog] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  async function saveState(blog, changes) {
    const payload = new FormData();
    payload.append("title", blog.title);
    payload.append("slug", blog.slug);
    payload.append("description", blog.description || "");
    payload.append("coverImageUrl", blog.cover_image_url || "");
    payload.append("contentType", blog.content_type || "BLOG");
    payload.append("accessType", changes.accessType || blog.access_type);
    payload.append("tags", JSON.stringify(blog.tags || []));
    payload.append("readingTimeMinutes", blog.reading_time_minutes || "");
    payload.append("authorName", blog.author_name || "");
    payload.append("seoTitle", blog.seo_title || "");
    payload.append("seoDescription", blog.seo_description || "");
    payload.append("status", changes.status || blog.status);
    payload.append("publishedAt", blog.published_at || "");
    await onSave(payload);
  }

  if (showEditor) {
    return <BlogEditor blog={editingBlog} onCancel={() => { setEditingBlog(null); setShowEditor(false); }} onSave={onSave} />;
  }

  return <div className="admin-card admin-table-card"><div className="admin-card-header"><div><p className="admin-card-kicker">Blog library</p><h2>All blogs</h2><p>Manage blog content stored in Supabase.</p></div><div className="admin-table-actions"><span className="admin-section-count">{blogs.length} blogs</span><button className="admin-action-button" onClick={() => setShowEditor(true)} type="button"><Plus size={15} /> Create blog</button></div></div><div className="admin-blog-list">{blogs.length ? blogs.map(blog => <div className="admin-blog-row" key={blog.id}><div className="admin-blog-title"><BookOpen size={17} /><div><strong>{blog.title}</strong><span>{formatDate(blog.published_at || blog.created_at)} · {(blog.tags || ["Uncategorised"])[0]}</span></div></div><span className={`admin-badge ${isPublished(blog) ? "is-published" : "is-unpublished"}`}>{blog.status}</span><span className={`admin-badge ${isPrivate(blog) ? "is-private" : "is-public"}`}>{isPrivate(blog) ? "Private" : "Public"}</span><div className="admin-row-actions"><button className="admin-row-icon" onClick={() => saveState(blog, {accessType: isPrivate(blog) ? "PUBLIC" : "PRIVATE"})} title={isPrivate(blog) ? "Make public" : "Make private"} type="button">{isPrivate(blog) ? <Globe2 size={15} /> : <LockKeyhole size={15} />}</button><button className="admin-row-icon" onClick={() => saveState(blog, {status: isPublished(blog) ? "DRAFT" : "PUBLISHED"})} title={isPublished(blog) ? "Unpublish" : "Publish"} type="button">{isPublished(blog) ? <Eye size={15} /> : <CheckCircle2 size={15} />}</button><button className="admin-row-icon" onClick={() => { setEditingBlog(blog); setShowEditor(true); }} title="Edit blog" type="button"><Edit3 size={15} /></button><button className="admin-row-icon admin-row-danger" onClick={() => onDelete(blog.id)} title="Delete blog" type="button"><Trash2 size={15} /></button></div></div>) : <div className="admin-empty-insight"><BookOpen size={28} /><strong>No blogs found</strong><span>Create the first blog in Supabase.</span></div>}</div></div>;
}

function UsersTab({summary, users}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userType, setUserType] = useState("KNOWN");
  const knownUsers = users.filter(user => user.userType === "KNOWN");
  const unknownUsers = users.filter(user => user.userType === "UNKNOWN");
  const visibleUsers = userType === "KNOWN" ? knownUsers : unknownUsers;

  return <div className="admin-card admin-users-card"><div className="admin-card-header"><div><p className="admin-card-kicker">Audience activity</p><h2>Users</h2><p>Known users are identified by email; direct visitors remain unknown by IP.</p></div><span className="admin-section-count">{summary.uniqueVisitors || users.length} users</span></div>{selectedUser ? <div className="admin-user-detail"><button className="admin-secondary-button" onClick={() => setSelectedUser(null)} type="button">Back to users</button><h2>{selectedUser.email || selectedUser.ipAddress}</h2><p className="admin-user-address">{selectedUser.ipAddresses?.join(", ") || selectedUser.ipAddress}</p><div className="admin-user-metrics"><span><strong>{selectedUser.websiteViews}</strong> website opens</span><span><strong>{selectedUser.blogViews}</strong> blog opens</span><span><strong>{selectedUser.uniquePrivateArticles}</strong> private articles</span><span><strong>{selectedUser.privateArticleViews}</strong> private opens</span></div><h3>Private articles opened</h3>{selectedUser.privateArticles.length ? <div className="admin-user-articles">{selectedUser.privateArticles.map(article => <div className="admin-user-article" key={article.id}><span>{article.title}</span><strong>{article.opens} opens</strong></div>)}</div> : <p>No private articles opened.</p>}</div> : <><div className="admin-user-tabs"><button className={userType === "KNOWN" ? "active" : ""} onClick={() => setUserType("KNOWN")} type="button">Known users <strong>{knownUsers.length}</strong></button><button className={userType === "UNKNOWN" ? "active" : ""} onClick={() => setUserType("UNKNOWN")} type="button">Unknown users <strong>{unknownUsers.length}</strong></button></div>{visibleUsers.length ? <div className="admin-users-list">{visibleUsers.map(user => <button className="admin-user-row" key={user.id} onClick={() => setSelectedUser(user)} type="button"><span className="admin-user-identity"><strong>{user.email || user.ipAddress}</strong><small>{user.ipAddresses?.length || 1} IP address{user.ipAddresses?.length === 1 ? "" : "es"} · Last seen {formatDate(user.lastSeenAt)}</small></span><span><strong>{user.websiteViews}</strong><small>site opens</small></span><span><strong>{user.blogViews}</strong><small>blog opens</small></span><span><strong>{user.uniquePrivateArticles}</strong><small>private articles</small></span></button>)}</div> : <div className="admin-empty-insight"><Users size={28} /><strong>No {userType.toLowerCase()} users recorded</strong><span>Visitors will appear here after they open the website or a blog.</span></div>}</>}</div>;
}
