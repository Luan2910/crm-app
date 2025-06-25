import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../share/context/AuthContext";

export default function ProtectedRoute() {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      return navigate("/", { replace: true });
    }
  }, [auth.isLoggedIn, navigate]);
  return (
		<Outlet/>
  )
}
