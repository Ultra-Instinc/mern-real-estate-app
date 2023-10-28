import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
	const user = useSelector((state) => state.user);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("searchTerm", searchTerm);
		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		if (searchTermFromUrl) {
			setSearchTerm(searchTermFromUrl);
		}
	}, [location.search]);
	return (
		<header className='sticky bg-gradient-to-r from-mern-bg_grad_1 via-mern-bg_grad_2 to-mern-bg_grad_3 shadow-lg  top-0 left-0 z-40'>
			<div className='absolute inset-0 bg-gradient-to-r -z-10 from-mern-bg_grad_1 via-mern-bg_grad_3  to-mern-bg_grad_1 shadow-md shadow-mern-bg_grad_3 filter blur-xl'></div>

			<div className=' flex items-center justify-between max-w-6xl mx-auto p-3 '>
				<Link
					to={"/"}
					className=' font-bold text-sm sm:text-xl'>
					<span className='text-mern-element hover:text-emerald-700 text-2xl duration-300'>
						TheCrib.
					</span>
				</Link>
				<form
					onSubmit={handleSubmit}
					className='bg-blue-100 flex p-3 rounded-lg items-center focus-within:inner-border-mern-element focus-within:inner-border-2 duration-700 focus-within:bg-slate-100	 '>
					<input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						type='text'
						placeholder='Search...'
						className='text-blue-500 placeholder:text-mern-element font-semibold bg-transparent outline-none w-24 sm:w-64'
					/>
					<button className=' '>
						<FaSearch className='text-mern-element_2' />
					</button>
				</form>
				<ul className='flex gap-4 text-blue-500 font-bold text-md'>
					<Link
						className='text-mern-element_2 hover:text-emerald-600 font-semibold text-xl hover:scale-105 duration-700 hidden sm:inline'
						to={"/"}>
						Home
					</Link>
					<Link
						className='text-mern-element_2 hover:text-emerald-600 font-semibold text-xl hover:scale-105 duration-700 hidden sm:inline'
						to={"/about"}>
						About
					</Link>
					{user.currentUser ? (
						<Link to={"/profile"}>
							<div>
								<img
									src={user.currentUser.avatar}
									alt='profile'
									className='rounded-full h-7 w-7 object-cover'
								/>
							</div>
						</Link>
					) : (
						<Link
							className='text-mern-element_2 hover:text-emerald-600 font-semibold text-xl hover:scale-105 duration-700'
							to={"/sign-in"}>
							Sign in
						</Link>
					)}
				</ul>
			</div>
		</header>
	);
}
