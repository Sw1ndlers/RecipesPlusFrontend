/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL:
			process.env.NODE_ENV === "development"
				? "http://127.0.0.1:4040"
				: "https://api.recipesplus.live",
	},
};

module.exports = nextConfig;
