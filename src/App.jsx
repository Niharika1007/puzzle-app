import React, { useState, useEffect, Suspense } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./firebase";

const PuzzleBoard = React.lazy(() => import("./components/PuzzleBoard"));

function App() {
  const [user, setUser] = useState(null);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // 🔑 Persist login using Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Login with Google
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Save user to backend
      await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔑 Include cookies
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });

    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Clear local user state
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName}</h1>

          <Suspense fallback={<div>Loading puzzles...</div>}>
            <PuzzleBoard />
          </Suspense>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login with Google
        </button>
      )}
    </div>
  );
}

export default App;
