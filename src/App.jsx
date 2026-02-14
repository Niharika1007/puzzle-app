import { useState, useEffect, Suspense } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./firebase";

const Puzzle = React.lazy(() => import("./components/Puzzle"));

function App() {
  const [user, setUser] = useState(null);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">

      {user ? (
        <>
          <h1 className="text-2xl mb-4">
            Welcome, {user.displayName}
          </h1>

          <Suspense fallback={<div>Loading...</div>}>
            <Puzzle />
          </Suspense>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <button onClick={handleLogin}>
          Login with Google
        </button>
      )}

    </div>
  );
}

export default App;
