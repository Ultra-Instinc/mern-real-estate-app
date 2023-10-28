import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice";
export default function OAuth() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleGoogleClick = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);

			const result = await signInWithPopup(auth, provider);

			const res = await fetch("http://localhost:3000/api/auth/google", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}),
			});
			const data = await res.json();
			dispatch(signInSuccess(data));
			navigate("/");
		} catch (error) {}
	};
	return (
		<button
			onClick={handleGoogleClick}
			type='button'
			className=' bg-gradient-to-tr from-yellow-500/30 to-blue-500/30 via-green-500/30 group rounded-lg p-3 flex items-center justify-center hover:scale-x-[101%] hover:bg-mern-element/50 duration-700 active:scale-95 '>
			<FcGoogle size={24} />
		</button>
	);
}
