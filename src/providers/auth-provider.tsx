// 1. Import necessary stuff
import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

// 2. Define the types
type AuthData = {
  session: Session | null;
  loading: boolean;
  user: any;
};

// 3. Create the context OUTSIDE the component
const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  user: null,
});

// 4. The Provider component
export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUser(user);
        }
      }

      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session) {
          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("Error fetching user:", error);
          } else {
            setUser(user);
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
