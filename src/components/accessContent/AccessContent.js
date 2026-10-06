import React, {useState} from "react";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import "./AccessContent.scss";

export const ACCESS_COOKIE_NAME = "contentAccess";
const ACCESS_COOKIE_VALUE = "granted";
const ACCESS_COOKIE_DAYS = 7;
const ACCESS_USER_ID = "userID";
const ACCESS_PASSWORD = "password";
const PASSWORD_REQUEST_URL = process.env.REACT_APP_PASSWORD_REQUEST_URL;

function hasAccessCookie() {
  return document.cookie.split("; ").some(
    cookie => cookie === `${ACCESS_COOKIE_NAME}=${ACCESS_COOKIE_VALUE}`
  );
}

function getRedirectPath(search) {
  const redirectPath = new URLSearchParams(search).get("redirect");
  return redirectPath && redirectPath.startsWith("/") ? redirectPath : "/";
}

function setAccessCookie() {
  const expires = new Date(
    Date.now() + ACCESS_COOKIE_DAYS * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${ACCESS_COOKIE_NAME}=${ACCESS_COOKIE_VALUE}; expires=${expires}; path=/`;
}

export function withAccessContent(WrappedComponent) {
  function AccessProtectedContent({isPrivate, ...props}) {
    const location = useLocation();

    if (!isPrivate || hasAccessCookie()) {
      return <WrappedComponent {...props} />;
    }

    const redirect = `${location.pathname}${location.search}${location.hash}`;
    return (
      <Redirect
        to={`/accessContent?redirect=${encodeURIComponent(redirect)}`}
      />
    );
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

  function handleSubmit(event) {
    event.preventDefault();

    if (userId !== ACCESS_USER_ID || password !== ACCESS_PASSWORD) {
      setError("That user ID or password is not recognised.");
      return;
    }

    setAccessCookie();
    history.replace(getRedirectPath(location.search));
  }

  async function handlePasswordRequest(event) {
    event.preventDefault();
    setError("");
    setRequestSent(false);

    if (!PASSWORD_REQUEST_URL) {
      setError("Password requests are not available yet. Please contact the site owner.");
      return;
    }

    try {
      const response = await fetch(PASSWORD_REQUEST_URL, {
        body: JSON.stringify({email, name}),
        headers: {"Content-Type": "application/json"},
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("Password request failed");
      }

      setRequestSent(true);
    } catch (requestError) {
      setError("We could not send the password right now. Please try again later.");
    }
  }

  function showLogin() {
    setView("login");
    setError("");
    setRequestSent(false);
  }

  function showPasswordRequest() {
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
              <label htmlFor="access-user-id">User ID</label>
              <input
                id="access-user-id"
                onChange={event => setUserId(event.target.value)}
                required
                type="text"
                value={userId}
              />
              <label htmlFor="access-password">Password</label>
              <input
                id="access-password"
                onChange={event => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
              {error && <p className="access-content-error" role="alert">{error}</p>}
              <button type="submit">Continue</button>
            </form>
            <button className="access-content-link" onClick={showPasswordRequest} type="button">
              Need a password?
            </button>
          </>
        ) : (
          <>
            <h1 id="access-title">Request a password</h1>
            <p className="access-content-intro">
              Tell us where to send your randomly generated password.
            </p>
            <form onSubmit={handlePasswordRequest}>
              <label htmlFor="access-name">Name</label>
              <input
                id="access-name"
                onChange={event => setName(event.target.value)}
                required
                type="text"
                value={name}
              />
              <label htmlFor="access-email">Email address</label>
              <input
                id="access-email"
                onChange={event => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
              {error && <p className="access-content-error" role="alert">{error}</p>}
              {requestSent && (
                <p className="access-content-success" role="status">
                  Check your mailbox for your password.
                </p>
              )}
              <button type="submit">Request password</button>
            </form>
            <button className="access-content-link" onClick={showLogin} type="button">
              Already have a password? Sign in
            </button>
          </>
        )}
      </section>
    </main>
  );
}