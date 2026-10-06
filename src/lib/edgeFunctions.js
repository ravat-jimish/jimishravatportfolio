import {supabase, supabasePublishableKey, supabaseUrl} from "./supabase";

export async function invokeEdgeFunction(
  functionName,
  {body, headers = {}, method = "POST"} = {}
) {
  const isFormData = body instanceof FormData;
  const response = await fetch(
    `${supabaseUrl}/functions/v1/${functionName}`,
    {
      body: body === undefined
        ? undefined
        : isFormData
          ? body
          : JSON.stringify(body),
      credentials: "include",
      headers: {
        apikey: supabasePublishableKey,
        ...(isFormData ? {} : {"Content-Type": "application/json"}),
        ...headers
      },
      method
    }
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.error || "Request failed");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export async function invokeAuthenticatedFunction(
  functionName,
  options = {}
) {
  const {
    data: {session}
  } = await supabase.auth.getSession();

  if (!session) {
    const error = new Error("AUTH_REQUIRED");
    error.status = 401;
    throw error;
  }

  return invokeEdgeFunction(functionName, {
    ...options,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      ...(options.headers || {})
    }
  });
}

export function trackVisit(path = window.location.pathname) {
  return invokeEdgeFunction("track-visit", {
    body: {
      path,
      referrer: document.referrer
    }
  }).catch(() => null);
}

export function getPrivateAccessHeaders() {
  const sessionToken = window.localStorage.getItem("paccess_session");
  const deviceToken = window.localStorage.getItem("paccess_device");

  if (!sessionToken || !deviceToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${sessionToken}`,
    "x-device-token": deviceToken
  };
}

export function savePrivateAccessTokens({sessionToken, deviceToken}) {
  if (sessionToken) {
    window.localStorage.setItem("paccess_session", sessionToken);
  }

  if (deviceToken) {
    window.localStorage.setItem("paccess_device", deviceToken);
  }
}

export function clearPrivateAccessTokens() {
  window.localStorage.removeItem("paccess_session");
  window.localStorage.removeItem("paccess_device");
}