import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DefalutPageLoader from "../Loaders/DefalutPageLoader";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // Decode JWT payload or fetch user profile from /auth/me
      fetch("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/"); // Header picks up user automatically
        });
    }
  }, [searchParams, navigate]);

  return <DefalutPageLoader />;
}
