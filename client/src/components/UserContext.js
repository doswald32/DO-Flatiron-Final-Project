import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/check_session", {
            method: "GET",
            credentials: "include",
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error(`Error in response: ${r.status}`)
            }
            return r.json()
        })
        .then((data) => {
            setUser(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching session:", err);
            setLoading(false);
        })
        }, []);

        return (
            <UserContext.Provider value={{ user, setUser, loading }}>
                {children}
            </UserContext.Provider>
        );
}

export function useUser() {
    return useContext(UserContext);
}