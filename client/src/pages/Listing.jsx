import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
	FaBath,
	FaBed,
	FaChair,
	FaMapMarkerAlt,
	FaParking,
	FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
	SwiperCore.use([Navigation]);
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [copied, setCopied] = useState(false);
	const [contact, setContact] = useState(false);
	const { currentUser } = useSelector((state) => state.user);
	useEffect(() => {
		const fetchListing = async () => {
			try {
				setLoading(true);
				const res = await fetch(
					`https://mern-real-estate-903l.onrender.com/api/listing/get/${params.listingId}`,
					{
						method: "GET",
						credentials: "include",
					}
				);
				const data = await res.json();
				if (data.success === false) {
					setError(true);
					setLoading(false);
					return;
				}
				setListing(data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setError(true);
			}
		};

		fetchListing();
	}, [params.listingId]);
	return (
		<main className='text-mern-text'>
			{loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
			{error && (
				<p className='text-center my-7 text-2xl '>Something went wrong !!!</p>
			)}
			{listing && !loading && !error && (
				<>
					<Swiper navigation>
						{listing.imageUrls.map((url) => (
							<SwiperSlide key={url}>
								<div
									className='h-[500px] '
									style={{
										background: `url(${url}) center no-repeat`,
										backgroundSize: "cover",
									}}></div>
							</SwiperSlide>
						))}
					</Swiper>
				</>
			)}
			<div className='fixed  top-[13%] hover:scale-110 duration-200 active:scale-75 right-[3%] z-10  rounded-full w-12 h-12 flex justify-center items-center bg-mern-bg/80 cursor-pointer'>
				<FaShare
					className='text-mern-element_2'
					onClick={() => {
						navigator.clipboard.writeText(window.location.href);
						setCopied(true);
						setTimeout(() => {
							setCopied(false);
						}, 1000);
					}}
				/>
			</div>
			{copied && (
				<p className='fixed top-[23%] right-[5%] z-10 font-semibold rounded-lg bg-mern-bg/80 p-2'>
					Link copied!
				</p>
			)}
			<div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
				<p className='text-2xl font-semibold'>
					{listing?.name} - ${" "}
					{listing?.offer
						? listing?.discountPrice.toLocaleString("en-US")
						: listing?.regularPrice.toLocaleString("en-US")}
					{listing?.type === "rent" && " / month"}
				</p>
				<p className='flex items-center mt-6 gap-2 text-mern-test  text-sm'>
					<FaMapMarkerAlt className='text-violet-700' />
					{listing?.address}
				</p>
				<div className='flex gap-4'>
					<p className='bg-mern-bg_grad_3 w-full max-w-[200px] text-slate-200 text-center p-1 rounded-md'>
						{listing?.type === "rent" ? "For Rent" : "For Sale"}
					</p>
					{listing?.offer && (
						<p className='bg-cyan-800 w-full max-w-[200px] text-slate-200 text-center p-1 rounded-md'>
							${+listing.regularPrice - +listing.discountPrice} OFF
						</p>
					)}
				</div>
				<p className='text-mern-test font-light md:font-semibold'>
					<span className='font-semibold md:font-bold text-mern-text'>
						Description -{" "}
					</span>
					{listing?.description} Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Laborum quas, et nulla molestias illo autem
					similique beatae doloremque harum ipsum ab quam deleniti tenetur minus
					nostrum praesentium tempora delectus explicabo molestiae expedita
					incidunt accusantium non cupiditate enim! Distinctio quod doloribus
					odio, fuga doloremque quisquam voluptatem, animi minus deleniti
					consequatur culpa.{" "}
				</p>
				<ul className='text-mern-text font-semibold   mb-7  text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
					<li className='flex items-center gap-1  '>
						<FaBed className='text-lg text-mern-test' />
						{listing?.bedrooms > 1
							? `${listing?.bedrooms} beds `
							: `${listing?.bedrooms} bed `}
					</li>
					<li className='flex items-center gap-1 whitespace-nowrap '>
						<FaBath className='text-lg text-mern-test' />
						{listing?.bathrooms > 1
							? `${listing?.bathrooms} baths `
							: `${listing?.bathrooms} bath `}
					</li>
					<li className='flex items-center gap-1 whitespace-nowrap '>
						<FaParking className='text-lg text-mern-test' />
						{listing?.parking ? "Parking spot" : "No Parking"}
					</li>
					<li className='flex items-center gap-1 whitespace-nowrap '>
						<FaChair className='text-lg text-mern-test' />
						{listing?.furnished ? "Furnished" : "Unfurnished"}
					</li>
				</ul>
				{currentUser && listing?.userRef !== currentUser._id && !contact && (
					<button
						onClick={() => setContact(true)}
						className='bg-mern-bg_grad_3 text-mern-text text-xl font-semibold hover:text-emerald-600 hover:scale-105 duration-700 active:scale-100 active:shadow-none hover:shadow-md hover:shadow-emerald-600 rounded-lg uppercase hover:opacity-95 p-3'>
						Contach landlord
					</button>
				)}
				{contact && <Contact listing={listing} />}
			</div>
		</main>
	);
}
