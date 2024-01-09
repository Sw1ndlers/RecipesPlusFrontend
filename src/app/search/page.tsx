"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { RecipeCard, LoadingRecipeCard } from "@components/RecipeCard";
import type { Recipe } from "@/types/Recipes";
import ErrorPage from "@components/Error";

function NoQuery() {
	return (
		<ErrorPage
			title="No recipes found"
			caption="Try a different search term"
		/>
	);
}

function RecipesContainer({ children }: { children: any }) {
	return (
		<div className="flex size-full justify-center">
			<div className="flex flex-wrap justify-center gap-9 p-12 lg:w-7/12">
				{children}
			</div>
		</div>
	);
}

export default function Page() {
    const apiURL = process.env.API_URL;
	const searchParams = useSearchParams();
	const query = searchParams?.get("q");

	const fetcher = (...args: [RequestInfo, RequestInit?]) =>
		fetch(...args).then((res) => res.json());

	const { data, error } = useSWR(
		`http://${apiURL}/search/${query}`,
		fetcher,
	);

	if (!query || !searchParams) return <NoQuery />;
	if (error) return <ErrorPage caption={"Recipes could not be fetched"} />;
	if (!data)
		return (
			<RecipesContainer>
				{[...Array(24)].map((_, i) => (
					<LoadingRecipeCard key={i} />
				))}
			</RecipesContainer>
		);
	return (
		<RecipesContainer>
			{data.ok ? (
				data.value.length === 0 ? (
					<NoQuery />
				) : (
					data.value.map((recipe: Recipe) => (
						<RecipeCard recipe={recipe} key={recipe.id} />
						// <LoadingRecipeCard key={recipe.id} />
					))
				)
			) : (
				<ErrorPage caption={data.error} />
			)}
		</RecipesContainer>
	);
}
