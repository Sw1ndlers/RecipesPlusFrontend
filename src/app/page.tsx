"use client";


import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ErrorPage from "@/components/Elements/Error";
import { swrFetcher } from "@/functions/Fetching";
import { SearchedRecipe } from "@/types/Recipes";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSWR from "swr";

import { RecipeCard } from "@/components/Recipes/RecipeCard";

function FeaturedScroller({ searchTerm }: { searchTerm: string }) {
	const apiUrl = process.env.API_URL;
	const { data, error, isLoading } = useSWR(
		`https://${apiUrl}/search/${searchTerm}`,
		swrFetcher,
	);

	if (error) return <ErrorPage caption={error} />;
	if (isLoading) return <></>;
	if (!data.ok) return <ErrorPage caption={data.error} />;

	const recipes: SearchedRecipe[] = data.value;
	return (
		<div>
			<p className=" mb-5 text-3xl font-bold text-white">{searchTerm}</p>
			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				navigation={true}
				modules={[Pagination]}
				spaceBetween={16}
				slidesPerView="auto"
			>
				{recipes.map((recipe, index) => (
					<SwiperSlide
						style={{
							width: "auto",
						}}
						key={index}
					>
						<RecipeCard recipe={recipe} minmal={true} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default function Root() {
	return (
		<div className="p-10 pt-10">
			<h1 className="pb-16 text-5xl font-bold text-white w-full text-center">
				Featured Recipes
			</h1>

			<div className="flex flex-col gap-20">
				<FeaturedScroller searchTerm="Chicken" />
				<FeaturedScroller searchTerm="Apple" />
			</div>
		</div>
	);
}
