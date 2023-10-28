import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function Home() {
	const [offerListings, setOfferListings] = useState([]);
	const [rentListings, setRentListings] = useState([]);
	const [salesListings, setSalesListings] = useState([]);
	SwiperCore.use([Navigation]);

	useEffect(() => {
		const fetchOfferListings = async () => {
			try {
				const res = await fetch(
					"http://localhost:3000/api/listing/get?offer=true&limit=4"
				);
				const data = await res.json();
				setOfferListings(data);
				fetchRentListings();
			} catch (error) {}
		};
		const fetchRentListings = async () => {
			try {
				const res = await fetch(
					"http://localhost:3000/api/listing/get?type=rent&limit=4"
				);
				const data = await res.json();
				setRentListings(data);
				fetchSalesListings();
			} catch (error) {}
		};
		const fetchSalesListings = async () => {
			try {
				const res = await fetch(
					"http://localhost:3000/api/listing/get?type=sale&limit=4"
				);
				const data = await res.json();
				setSalesListings(data);
			} catch (error) {}
		};
		fetchOfferListings();
	}, []);
	return (
		<div>
			{/* top */}
			<div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
				<h1 className='text-mern-text font-bold text-3xl lg:text-6xl'>
					Find your next {"  "}
					<span className='text-mern-test uppercase'>perfect</span>
					<br /> residence with ease
				</h1>
				<div className='text-mern-text font-semibold text-md sm:text-lg'>
					<span className='text-mern-test text-2xl'>TheCrib.</span> is the best
					place to find your next perfect home
					<br />
					we have wide range of properties for you to choose from
				</div>
				<Link
					to={"/search"}
					className='text-slate-100 w-fit'>
					<div className='relative bg-mern-element group font-semibold overflow-hidden  p-4 rounded-full hover:shadow-md hover:shadow-mern-text'>
						Let's get started
						<div className='absolute flex items-center justify-center inset-0 -translate-x-36 rounded-full group-hover:translate-x-0 duration-500 z-50 bg-mern-test'>
							<HiOutlineArrowRight className='scale-150' />
						</div>
					</div>
				</Link>
			</div>

			{/* swiper */}
			<Swiper navigation>
				{offerListings &&
					offerListings.length > 0 &&
					offerListings.map((listing) => (
						<SwiperSlide>
							<div
								style={{
									background: `url(${listing.imageUrls[0]}) center no-repeat`,
									backgroundSize: "cover",
								}}
								className='h-[500px]'
								key={listing._id}></div>
						</SwiperSlide>
					))}
			</Swiper>

			{/* listings results for offer,sale and rent */}
			<div className='max-w-[1450px] mx-auto p-3 flex flex-col gap-8 my-10 '>
				{offerListings && offerListings.length > 0 && (
					<div className=''>
						<div className='my-3 flex items-center justify-between max-w-[1450px] mx-auto mb-3'>
							<h2 className='text-2xl font-semibold text-mern-text'>
								Recent offers
							</h2>
							<Link
								className='font-semibold flex justify-center items-center gap-2 text-blue-800 hover:underline'
								to={"/search?offer=true"}>
								<span>Show more</span>
							</Link>
						</div>
						<div className='flex flex-wrap gap-4'>
							{offerListings.map((listing) => (
								<ListingItem
									listing={listing}
									key={listing._id}
								/>
							))}
						</div>
					</div>
				)}
				{rentListings && rentListings.length > 0 && (
					<div className=''>
						<div className='my-3 flex items-center justify-between max-w-[1450px] mx-auto mb-3'>
							<h2 className='text-2xl font-semibold text-mern-text'>
								Recent offers
							</h2>
							<Link
								className='font-semibold flex justify-center items-center gap-2 text-blue-800 hover:underline'
								to={"/search?offer=true"}>
								<span>Show more</span>
							</Link>
						</div>
						<div className='flex flex-wrap gap-4'>
							{rentListings.map((listing) => (
								<ListingItem
									listing={listing}
									key={listing._id}
								/>
							))}
						</div>
					</div>
				)}
				{salesListings && salesListings.length > 0 && (
					<div className=''>
						<div className='my-3 flex items-center justify-between max-w-[1450px] mx-auto mb-3'>
							<h2 className='text-2xl font-semibold text-mern-text'>
								Recent offers
							</h2>
							<Link
								className='font-semibold flex justify-center items-center gap-2 text-blue-800 hover:underline'
								to={"/search?offer=true"}>
								<span>Show more</span>
							</Link>
						</div>
						<div className='flex flex-wrap gap-4'>
							{salesListings.map((listing) => (
								<ListingItem
									listing={listing}
									key={listing._id}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
