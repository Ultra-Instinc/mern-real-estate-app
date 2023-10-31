import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserFailure,
	deleteUserSuccess,
	signOutUserStart,
	signOutUserSuccess,
	signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function Profile() {
	const fileRef = useRef(null);
	const { currentUser, loading, error } = useSelector((state) => state.user);
	const [file, setFile] = useState(undefined);
	const [filePerc, setFilePerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [showListingsError, setShowListingsError] = useState(false);
	const [formData, setFormData] = useState({});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [userListings, setUserListing] = useState([]);
	const dispatch = useDispatch();

	// firebase storage
	// allow read;
	// allow write: if
	// request.resource.size < 2 * 1024 * 1024 &&
	// request.resource.contentType.matches('image/.*')

	useEffect(() => {
		if (file) {
			handleFileUpload(file);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);
	// using firebase to upload the user image to the storage
	const handleFileUpload = (file) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setFilePerc(Math.round(progress));
			},
			// eslint-disable-next-line no-unused-vars
			(error) => {
				setFileUploadError(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
					setFormData({ ...formData, avatar: downloadURL })
				);
			}
		);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(updateUserStart());
			const res = await fetch(
				`https://mern-real-estate-903l.onrender.com/api/user/update/${currentUser._id}`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);
			const data = await res.json();
			if (data.success === false) {
				dispatch(updateUserFailure(data.message));
				return;
			}

			dispatch(updateUserSuccess(data));
			setUpdateSuccess(true);
		} catch (error) {
			dispatch(updateUserFailure(error.message));
		}
	};
	const handleDeleteUser = async () => {
		try {
			dispatch(deleteUserStart());
			const res = await fetch(
				`https://mern-real-estate-903l.onrender.com/api/user/delete/${currentUser._id}`,
				{
					method: "DELETE",
					credentials: "include",
				}
			);
			const data = await res.json();
			if (data.success === false) {
				dispatch(deleteUserFailure(data.message));
				return;
			}
			dispatch(deleteUserSuccess(data));
		} catch (error) {
			dispatch(deleteUserFailure(error.message));
		}
	};
	const handleSignOut = async () => {
		try {
			dispatch(signOutUserStart());
			const res = await fetch(
				`https://mern-real-estate-903l.onrender.com/api/auth/signout`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const data = await res.json();
			if (data.success === false) {
				dispatch(signOutUserFailure(data.message));
				return;
			}
			dispatch(signOutUserSuccess());
		} catch (error) {
			dispatch(signOutUserFailure(error));
		}
	};
	const handleShowListings = async () => {
		try {
			setShowListingsError(false);
			const res = await fetch(
				`https://mern-real-estate-903l.onrender.com/api/user/listings/${currentUser._id}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const data = await res.json();
			setUserListing(data);
			if (data.success === false) {
				setShowListingsError(true);
				return;
			}
		} catch (error) {
			setShowListingsError(true);
		}
	};
	const handleListingDelete = async (listingId) => {
		try {
			const res = await fetch(
				`https://mern-real-estate-903l.onrender.com/api/listing/delete/${listingId}`,
				{
					method: "DELETE",
					credentials: "include",
				}
			);
			const data = await res.json();
			if (data.success === false) {
				return;
			}
			setUserListing((prev) =>
				prev.filter((listing) => listing._id !== listingId)
			);
		} catch (error) {}
	};
	return (
		<div className='p-3 max-w-lg mx-auto text-mern-test font-semibold'>
			<h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4'>
				<input
					onChange={(e) => setFile(e.target.files[0])}
					type='file'
					ref={fileRef}
					hidden
					accept='image/*'
				/>
				<img
					onClick={() => fileRef.current.click()}
					src={formData.avatar || currentUser.avatar}
					alt='profile'
					className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
				/>
				<p className='text-sm self-center'>
					{fileUploadError ? (
						<span className='text-red-700'>
							Error Image upload (image must be less than 2 mb)
						</span>
					) : filePerc > 0 && filePerc < 100 ? (
						<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
					) : filePerc === 100 ? (
						<span className='text-green-700'>Image successfully uploaded!</span>
					) : (
						""
					)}
				</p>
				<input
					type='text'
					placeholder='username'
					defaultValue={currentUser.username}
					id='username'
					className='border p-3 rounded-lg outline-none duration-300 md:focus:scale-x-105 bg-blue-100 focus:bg-slate-100 focus:ring-2 focus:ring-mern-test'
					onChange={handleChange}
				/>
				<input
					type='email'
					placeholder='email'
					id='email'
					defaultValue={currentUser.email}
					className='border p-3 rounded-lg outline-none duration-300 md:focus:scale-x-105 bg-blue-100 focus:bg-slate-100 focus:ring-2 focus:ring-mern-test'
					onChange={handleChange}
				/>
				<input
					type='password'
					placeholder='password'
					onChange={handleChange}
					id='password'
					className='border p-3 rounded-lg outline-none duration-300 md:focus:scale-x-105 bg-blue-100 focus:bg-slate-100 focus:ring-2 focus:ring-mern-test'
				/>
				<button
					disabled={loading}
					className='  disabled:cursor-not-allowed rounded-lg p-3 uppercase disabled:opacity-80 text-mern-bg_grad_1 bg-mern-element hover:scale-x-105 duration-300 hover:text-blue-100'>
					{loading ? "Loading..." : "Update"}
				</button>
				<Link
					to='/create-listing'
					className='  rounded-lg p-3 text-center uppercase  text-mern-test bg-mern-bg_grad_3 hover:scale-x-105 duration-300 hover:text-blue-100'>
					Create Listing
				</Link>
			</form>

			<div className='flex justify-between mt-5'>
				<span
					onClick={handleDeleteUser}
					className='text-rose-500 cursor-pointer'>
					Delete account
				</span>
				<span
					onClick={handleSignOut}
					className='text-orange-500 cursor-pointer'>
					Sign out
				</span>
			</div>

			<p className='text-red-700 mt-5'>{error ? error : ""}</p>
			<p className='text-green-700 mt-5'>
				{updateSuccess ? "User is updated successfully!" : ""}
			</p>
			<button
				className=' w-full  p-3 text-mern-test bg-mern-bg_grad_3 hover:scale-x-105 duration-300 rounded-lg hover:text-blue-100'
				onClick={handleShowListings}>
				Show Listings
			</button>
			<p className='text-red-700 mt-5 '>
				{showListingsError ? "Error Showing Listings" : ""}
			</p>
			{userListings && userListings.length > 0 && (
				<div className='flex flex-col gap-4'>
					<h1 className='text-center mt-7 text-2xl font-semibold'>
						Your Listings
					</h1>
					{userListings.map((listing) => (
						<div
							key={listing._id}
							className='bg-mern-element/10 text-blue-100 font-semibold rounded-lg p-3 flex justify-between items-center gap-4'>
							<Link to={`/listing/${listing._id}`}>
								<img
									src={listing.imageUrls[0]}
									alt='listing cover'
									className='h-16 w-16 object-contain'
								/>
							</Link>
							<Link
								className=' font-semibold  hover:underline truncate flex-1'
								to={`/listing/${listing._id}`}>
								<p>{listing.name}</p>
							</Link>

							<div className='flex flex-col '>
								<button
									onClick={() => handleListingDelete(listing._id)}
									className='text-red-700 uppercase'>
									Delete
								</button>
								<Link to={`/update-listing/${listing._id}`}>
									<button className='text-green-700 mx-auto w-full uppercase'>
										Edit
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
