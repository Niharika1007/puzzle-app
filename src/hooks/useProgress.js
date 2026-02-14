import { useState, useEffect } from "react";
import { auth } from "../../firebase";

export default function useAuth() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((u) => {

      setUser(u);

    });

    return unsubscribe;

  }, []);

  return user;

}
