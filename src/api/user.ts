import { secureFetch } from "../utils/secureFetch";

type ProfileResponse =
  | {
      user: User;
    }
  | {
      message: string;
    };

export const fetchUserProfile = async (): Promise<ProfileResponse> => {
  const res = await secureFetch("http://localhost:3000/api/user");

  const data = (await res.json()) as ProfileResponse;

  if (!res.ok) {
    if ("message" in data) {
      throw new Error(data.message);
    } else {
      throw new Error("Failed to fetch user profile");
    }
  }

  return data;
};
