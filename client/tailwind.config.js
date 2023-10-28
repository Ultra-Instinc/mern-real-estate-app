/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				mern: {
					bg: "#06151F",
					element: "#3FC0AC",
					element_2: "#0FC4B0",
					element_bg: "#020505",
					text: "#40C1A6",
					test: "#3FB3C2",
					bg_grad_1: "#121C1B",
					bg_grad_2: "#0E2F2B",
					bg_grad_3: "#094E48",
				},
			},
		},
	},
	plugins: [require("tailwindcss-inner-border")],
};
