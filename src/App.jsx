import { useState, useEffect } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import { dbPromise } from "./db";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Automatically switch between local & deployed backend
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      // ✅ Save user to backend
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });

      const data = await response.json();
      console.log("User saved to DB:", data);

      // ✅ Save login state in IndexedDB
      const db = await dbPromise;
      await db.put("progress", { loggedIn: true }, "userStatus");

    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);

    const db = await dbPromise;
    await db.put("progress", { loggedIn: false }, "userStatus");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {user.displayName}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
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
