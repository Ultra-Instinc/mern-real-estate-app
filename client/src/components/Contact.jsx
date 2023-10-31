import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
	const [landlord, setLandlord] = useState(null);
	const [message, setMessage] = useState("");
	useEffect(() => {
		const fetchLandlord = async () => {
			try {
				const res = await fetch(
					`https://mern-real-estate-903l.onrender.com/api/user/${listing.userRef}`,
					{
						method: "GET",
						credentials: "include",
					}
				);
				const data = await res.json();
				setLandlord(data);
			} catch (error) {}
		};
		fetchLandlord();
	}, [listing.userRef]);
	const handleChange = (e) => {
		setMessage(e.target.value);
	};
	return (
		<>
			{landlord && (
				<div className='flex flex-col gap-2   text-mern-text'>
					<p>
						Contact <span className='font-semibold '> {landlord.username}</span>{" "}
						for{" "}
						<span className='font-semibold '>{listing.name.toLowerCase()}</span>
					</p>
					<textarea
						onChange={handleChange}
						name='message'
						id='message'
						placeholder='enter tour message here...'
						className='w-full bg-blue-100 focus:bg-slate-100 p-3 rounded-lg outline-none placeholder:font-semibold placeholder:text-mern-text text-mern-text font-semibold duration-700 focus:scale-x-105 focus:ring-2 focus:ring-mern-element'
						rows='2'
						value={message}></textarea>
					<Link
						to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
						className='bg-mern-bg_grad_3 text-mern-text text-xl font-semibold hover:text-emerald-600 hover:scale-105 duration-700 text-center active:scale-100 active:shadow-none hover:shadow-md hover:shadow-emerald-600 rounded-lg uppercase hover:opacity-95 p-3'>
						Send Message
					</Link>
				</div>
			)}
		</>
	);
}
