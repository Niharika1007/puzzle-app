const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function saveUser(user) {

  const response = await fetch(`${BACKEND_URL}/users`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),

  });

  return response.json();

}
