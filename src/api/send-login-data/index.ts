import { InitialValues } from "pages/auth/login/hooks/types";

export const sendLoginData = async ({ username, password }: InitialValues) => {
  try {
    const req = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!req.ok) {
      const errorMessage = await req.json();
      throw new Error(errorMessage.message);
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
