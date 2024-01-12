"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { RecipeCard, LoadingRecipeCard } from "@/components/Recipes/RecipeCard";
import type { SearchedRecipe } from "@/types/Recipes";
import ErrorPage from "@/components/elements/Error";

function NoQuery() {
	return (
		<ErrorPage
			title="No recipes found"
			caption="Try a different search term"
		/>
	);
}

function RecipeCardList({ recipes }: { recipes: SearchedRecipe[] }) {
	return recipes.map((recipe) => (
		<RecipeCard recipe={recipe} key={recipe.id} />
	));
}

function LoadingCardList() {
	return [...Array(24)].map((_, i) => <LoadingRecipeCard key={i} />);
}



export default function Page() {
	const apiURL = process.env.API_URL;
	const searchParams = useSearchParams();
	const query = searchParams?.get("q");

	const fetcher = (...args: [RequestInfo, RequestInit?]) =>
		fetch(...args).then((res) => res.json());

	const { data, error } = useSWR(
		`https://${apiURL}/search/${query}`,
		fetcher,
	);

	if (!query || !searchParams) return <NoQuery />;
	if (error) return <ErrorPage caption={"Recipes could not be fetched"} />;

	return (
		<div className="flex size-full flex-wrap justify-center gap-9 self-center px-4 py-12 lg:w-7/12">
			{!data ? (
				<LoadingCardList />
			) : data.ok ? (
				data.value.length === 0 ? (
					<NoQuery />
				) : (
					<RecipeCardList recipes={data.value} />
				)
			) : (
				<ErrorPage caption={data.error} />
			)}
		</div>
	);
}
