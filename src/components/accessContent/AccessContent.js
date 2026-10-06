import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {
  invokeEdgeFunction,
  savePrivateAccessTokens
} from "../../lib/edgeFunctions";
import "./AccessContent.scss";

function getRedirectPath(search) {
  const redirectPath = new URLSearchParams(search).get("redirect");
  return redirectPath && redirectPath.startsWith("/") ? redirectPath : "/";
}

export function withAccessContent(WrappedComponent) {
  function AccessProtectedContent(props) {
    return <WrappedComponent {...props} />;
  }

  return AccessProtectedContent;
}

export default function AccessContent() {
  const history = useHistory();
  const location = useLocation();
  const [view, setView] = useState("login");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectPath = getRedirectPath(location.search);
  const articleSlug = redirectPath.split("/").filter(Boolean).pop() || "";

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);

    try {
      const result = await invokeEdgeFunction("verify-access", {
        body: {
          deviceToken: window.localStorage.getItem("paccess_device"),
          email: userId,
          password,
          slug: articleSlug
        }
      });
      savePrivateAccessTokens(result);
      history.replace(redirectPath);
    } catch (requestError) {
      setError(
        requestError.payload?.error === "TOO_MANY_ATTEMPTS"
          ? "Too many attempts. Please try again later."
          : requestError.payload?.error === "DEVICE_LIMIT_REACHED"
            ? "This access grant has reached its device limit."
            : "That email or password is not recognised."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordRequest(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    setRequestSent(false);
    setIsSubmitting(true);

    try {
      await invokeEdgeFunction("request-access", {
        body: {
          email,
          message: name ? `Requested by ${name}` : null,
          slug: articleSlug
        }
      });
      setRequestSent(true);
    } catch (requestError) {
      setError(
        requestError.payload?.error === "TOO_MANY_REQUESTS"
          ? "Too many requests. Please try again later."
          : "We could not send the request right now. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function showLogin() {
    if (isSubmitting) return;
    setView("login");
    setError("");
    setRequestSent(false);
  }

  function showPasswordRequest() {
    if (isSubmitting) return;
    setView("request");
    setError("");
    setRequestSent(false);
  }

  return (
    <main className="access-content">
      <section className="access-content-panel" aria-labelledby="access-title">
        <p className="access-content-kicker">Private content</p>
        {view === "login" ? (
          <>
            <h1 id="access-title">Sign in to continue</h1>
            <p className="access-content-intro">
              Enter your user ID and password to read this article.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="access-user-id">Email address</label>
              <input
                id="access-user-id"
                onChange={event => setUserId(event.target.value)}
                required
                type="email"
                value={userId}
                disabled={isSubmitting}
              />
              <label htmlFor="access-password">Password</label>
              <input
                id="access-password"
                onChange={event => setPassword(event.target.value)}
                required
                type="password"
                value={password}
                disabled={isSubmitting}
              />
              {error && <p className="access-content-error" role="alert">{error}</p>}
              {isSubmitting && <p className="access-content-progress" role="status">Verifying your access in the background...</p>}
              <button disabled={isSubmitting} type="submit">{isSubmitting ? "Checking..." : "Continue"}</button>
            </form>
            <button className="access-content-link" disabled={isSubmitting} onClick={showPasswordRequest} type="button">
              Need a password?
            </button>
          </>
        ) : (
          <>
            <h1 id="access-title">Request a password</h1>
            <p className="access-content-intro">
              Tell us where to send your randomly generated password. An admin
              will review your request, and your password will be emailed after
              approval.
            </p>
            <form onSubmit={handlePasswordRequest}>
              <label htmlFor="access-name">Name</label>
              <input
                id="access-name"
                onChange={event => setName(event.target.value)}
                required
                type="text"
                value={name}
                disabled={isSubmitting}
              />
              <label htmlFor="access-email">Email address</label>
              <input
                id="access-email"
                onChange={event => setEmail(event.target.value)}
                required
                type="email"
                value={email}
                disabled={isSubmitting}
              />
              {error && <p className="access-content-error" role="alert">{error}</p>}
              {isSubmitting && <p className="access-content-progress" role="status">Sending your request in the background...</p>}
              {requestSent && (
                <p className="access-content-success" role="status">
                  Your request was sent for admin approval. You will receive
                  your password by email after it is approved.
                </p>
              )}
              <button disabled={isSubmitting} type="submit">{isSubmitting ? "Sending..." : "Request password"}</button>
            </form>
            <button className="access-content-link" disabled={isSubmitting} onClick={showLogin} type="button">
              Already have a password? Sign in
            </button>
          </>
        )}
      </section>
    </main>
  );
}