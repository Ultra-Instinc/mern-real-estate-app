import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
	return (
		<div className='bg-mern-bg_grad_2 shadow-md duration-700 hover:shadow-lg hover:scale-105 text-mern-text  overflow-hidden rounded-lg  sm:w-[330px] w-[360px] mx-auto'>
			<Link to={`/listing/${listing._id}`}>
				<img
					src={
						listing.imageUrls[0] ||
						"https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
					}
					alt='listing cover'
					className='h-[320px] sm:h-[220px] w-full object-cover  transition-scale duration-300'
				/>
				<div className='p-3 flex flex-col gap-2 w-full'>
					<p className='truncate text-lg font-semibold text-mern-test'>
						{listing.name}
					</p>
					<div className='flex items-center gap-1'>
						<MdLocationOn className='h-4 w-4 text-violet-700' />
						<p className='text-sm  truncate w-full'>{listing.address}</p>
					</div>
					<p className='text-sm  line-clamp-2'>{listing.description}</p>
					<p className='text-mern-test mt-2 font-semibold '>
						$
						{listing.offer
							? listing.discountPrice.toLocaleString("en-US")
							: listing.regularPrice.toLocaleString("en-US")}
						{listing.type === "rent" && " / month"}
					</p>
					<div className=' flex gap-4'>
						<div className='font-bold text-xs'>
							{listing.bedrooms > 1
								? `${listing.bedrooms} beds `
								: `${listing.bedrooms} bed `}
						</div>
						<div className='font-bold text-xs'>
							{listing.bathrooms > 1
								? `${listing.bathrooms} baths `
								: `${listing.bathrooms} bath `}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
