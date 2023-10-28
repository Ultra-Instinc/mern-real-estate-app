import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	signInStart,
	signInSuccess,
	signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
	const [formData, setFormData] = useState({});
	const { currentUser, loading, error } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(signInStart());
			const res = await fetch("http://localhost:3000/api/auth/signin", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(signInFailure(data.message));
				return;
			}
			dispatch(signInSuccess(data));
			navigate("/");
		} catch (error) {
			dispatch(signInFailure(error.message));
		}
	};
	return (
		<div className=' h-[80vh] flex items-center justify-center'>
			<div className='p-3 max-w-lg w-full mx-auto text-mern-test font-semibold'>
				{currentUser ? (
					<Navigate to={"/"} />
				) : (
					<div>
						<h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
						<form
							onSubmit={handleSubmit}
							className='flex flex-col gap-4'>
							<input
								type='email'
								placeholder='email'
								className='border p-3 rounded-lg outline-none bg-blue-100 focus:bg-slate-100 placeholder:text-mern-text text-mern-text md:focus:scale-105 duration-300 '
								id='email'
								onChange={handleChange}
							/>
							<input
								type='password'
								placeholder='password'
								className='border p-3 rounded-lg outline-none bg-blue-100 focus:bg-slate-100 placeholder:text-mern-text text-mern-text md:focus:scale-105 duration-300 '
								id='password'
								onChange={handleChange}
							/>

							<button
								disabled={loading || !formData.email || !formData.password}
								className='bg-mern-text text-blue-100  disabled:hover:cursor-not-allowed p-3 rounded-lg uppercase hover:scale-105 duration-200 focus:scale-90 disabled:bg-mern-bg_grad_1 '>
								{loading ? "Loading..." : "Sign In"}
							</button>
							<OAuth />
						</form>
						<div className='flex gap-2 mt-5'>
							<p>{"Don't have an account?"}</p>
							<Link to={"/sign-up"}>
								<span className='text-blue-700 hover:underline duration-300'>
									Sign up
								</span>
							</Link>
						</div>
						{error && <p className='text-red-500 mt-5'>{error}</p>}
					</div>
				)}
			</div>
		</div>
	);
}
