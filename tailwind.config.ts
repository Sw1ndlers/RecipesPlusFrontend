import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dark: {
					0: "#c9c9c9",
					1: "#b8b8b8",
					2: "#828282",
					3: "#696969",
					4: "#424242",
					5: "#3b3b3b",
					6: "#2e2e2e",
					7: "#242424",
					8: "#1f1f1f",
					9: "#141414",
				},
			},
		},
	},
	plugins: [],
};
export default config;
