import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
	const user = useSelector((state) => state.user);
	return user.currentUser ? <Outlet /> : <Navigate to='sign-in' />;
}
