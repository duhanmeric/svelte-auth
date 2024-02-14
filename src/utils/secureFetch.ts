import { get } from "svelte/store";
import { authStore, type AuthState } from "../store/auth";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export async function secureFetch(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const authState: AuthState = get(authStore);
  const headers = new Headers(options.headers || {});

  if (authState.user.token) {
    headers.append("Authorization", `Bearer ${authState.user.token}`);
  }

  const mergedOptions: FetchOptions = { ...options, headers };

  const res = await fetch(url, mergedOptions);

  if (!res.ok && (res.status === 401 || res.status === 403)) {
    authStore.logout();
    throw new Error("Unauthorized: Invalid or expired token");
  }

  return res;
}
