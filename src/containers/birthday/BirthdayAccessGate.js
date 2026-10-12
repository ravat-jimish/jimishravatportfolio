import React, {useEffect, useState} from "react";
import {Heart, LockKeyhole, Sparkles} from "lucide-react";
import {useHistory} from "react-router-dom";
import {invokeAuthenticatedFunction} from "../../lib/edgeFunctions";
import {supabase} from "../../lib/supabase";
import BirthdayExperience from "../../components/birthday/Birthday";
import "./BirthdayAccessGate.scss";

function getAuthError(error) {
  if (error?.payload?.reason === "NO_BIRTHDAY_ACCESS") {
    return "This little world is reserved for someone very special.";
  }
  return "That sign-in did not open this love letter. Please check your details.";
}

export default function BirthdayAccessGate() {
  const history = useHistory();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkSession(currentSession) {
      if (!currentSession) {
        if (mounted) setChecking(false);
        return;
      }

      try {
        await invokeAuthenticatedFunction("check-birthday-access", {method: "GET"});
        if (mounted) setSession(currentSession);
      } catch (accessError) {
        await supabase.auth.signOut();
        if (mounted) {
          setSession(null);
          setError(getAuthError(accessError));
        }
      } finally {
        if (mounted) setChecking(false);
      }
    }

    supabase.auth.getSession().then(({data: {session: currentSession}}) => {
      checkSession(currentSession);
    });

    const {data: listener} = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (currentSession) checkSession(currentSession);
      else if (mounted) {
        setSession(null);
        setChecking(false);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signIn(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setChecking(true);
    setError("");

    const {data, error: signInError} = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError || !data.session) {
      setError("The email or password is not recognised.");
      setChecking(false);
      setIsSubmitting(false);
      return;
    }

    try {
      await invokeAuthenticatedFunction("check-birthday-access", {method: "GET"});
      setSession(data.session);
    } catch (accessError) {
      await supabase.auth.signOut();
      setError(getAuthError(accessError));
      setChecking(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    history.replace("/kruti");
  }

  if (checking) {
    return <main className="birthday-gate birthday-gate-loading"><Heart className="birthday-gate-heart" fill="currentColor" /><p>Checking the little door...</p></main>;
  }

  if (session) {
    return <BirthdayExperience onSignOut={signOut} />;
  }

  return (
    <main className="birthday-gate">
      <div className="birthday-gate-stars" aria-hidden="true"><span>✦</span><span>♡</span><span>✧</span></div>
      <section className="birthday-login" aria-labelledby="birthday-login-title">
        <div className="birthday-seal"><Heart fill="currentColor" size={22} /></div>
        <p className="birthday-kicker"><Sparkles size={14} /> A private little universe</p>
        <h1 id="birthday-login-title">Only you can<br /><em>open this.</em></h1>
        <p className="birthday-intro">There is a love letter waiting behind this door. Come in with the email and password made just for you.</p>
        <form onSubmit={signIn} className="birthday-login-form">
          <label htmlFor="birthday-email">Your email</label>
          <input id="birthday-email" autoComplete="email" onChange={event => setEmail(event.target.value)} required type="email" value={email} disabled={isSubmitting} />
          <label htmlFor="birthday-password">Your secret password</label>
          <input id="birthday-password" autoComplete="current-password" onChange={event => setPassword(event.target.value)} required type="password" value={password} disabled={isSubmitting} />
          {error && <p className="birthday-login-error" role="alert">{error}</p>}
          <button disabled={isSubmitting} type="submit"><LockKeyhole size={17} /> {isSubmitting ? "Opening our little world..." : "Open my birthday surprise"}</button>
        </form>
        <p className="birthday-login-footer">A door built with love, for one very loved person.</p>
      </section>
    </main>
  );
}