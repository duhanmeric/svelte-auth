import { secureFetch } from "../utils/secureFetch";

interface AuthApiResponse {
  message: string;
}

interface LoginResponse extends AuthApiResponse {
  isAuthenticated?: boolean;
  user: User;
}

export const loginApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json()) as LoginResponse;

  if (!res.ok) {
    throw new Error(data.message);
  }

  return { message: data.message, user: data.user };
};

export const logoutApi = async (): Promise<AuthApiResponse> => {
  const res = await secureFetch("http://localhost:3000/api/auth/logout", {
    method: "POST",
  });

  const data = (await res.json()) as AuthApiResponse;

  if (!res.ok) {
    throw new Error(data.message);
  }

  return { message: data.message };
};
