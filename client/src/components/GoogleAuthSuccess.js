import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function GoogleAuthSuccess() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  console.log(
    "ID", searchParams.get("id"),
    "First Name", searchParams.get("first_name"),
    "Last Name", searchParams.get("last_name"),
    "Usename", searchParams.get("username"),
    "Password", searchParams.get("_password_hash"),
    "Email", searchParams.get("email")
  );



  useEffect(() => {
    const newUser = {
        id: searchParams.get("id"),
        first_name: searchParams.get("first_name"),
        last_name: searchParams.get("last_name"),
        username: searchParams.get("username"),
        _password_hash: searchParams.get("_password_hash"),
        email: searchParams.get("email"),
      };
    console.log("In Google Success useEffect")
    console.log(newUser)
    setUser(newUser);
    navigate("/");
  }, [navigate, setUser, searchParams])

  

    // useEffect(() => {
    //   fetch("/check_session", {
    //     method: "GET",
    //     credentials: "include",
    //   })
    //     .then((r) => {
    //       if (!r.ok) {
    //         throw new Error("Session not found.");
    //       }
    //       return r.json();
    //     })
    //     .then((user) => {
    //       console.log("Google Authenticated User:", user);
    //       setUser(user);
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching user after Google login:", error);
    //       navigate("/login");
    //     });
    // }, [setUser, navigate]);

  return <div>Authenticating... Please wait.</div>;
}

export default GoogleAuthSuccess;
