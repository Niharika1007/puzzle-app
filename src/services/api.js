const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";


export const fetchPuzzlesAPI = async () => {

  const response = await fetch(`${BASE_URL}/puzzles`, {
    credentials: "include",
  });

  if (!response.ok)
    throw new Error("Failed to fetch puzzles");

  return await response.json();
};


export const saveProgressAPI = async (progress) => {

  await fetch(`${BASE_URL}/puzzles/progress`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({ progress }),

  });

};
