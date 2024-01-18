import { ErrorPage } from "@/components/Elements/Error";
import { SearchedRecipe } from "@/types/Recipes";
import { Err, Ok, Result } from "@/types/Results";

const apiUrl = process.env.API_URL;

export const swrFetcher = (...args: [RequestInfo, RequestInit?]) =>
	fetch(...args).then((res) => res.json());

export async function fetchWithToken(url: string, options: RequestInit = {}) {
	const token = localStorage.getItem("sessionToken");
	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `${token}`,
		},
	});
}

export function getRecipeInfoFromUrl(recipeParams: [number, string]): Result<
	{
		recipeId: number;
		recipeRawTitle: string;
	},
	JSX.Element
> {
	let recipeId = recipeParams[0];
	let recipeRawTitle = recipeParams[1];

	if (!recipeRawTitle) {
		return Err(<ErrorPage caption="No recipe title found" />);
	}

	if (!recipeId) {
		return Err(<ErrorPage caption="No recipe id found" />);
	}

	if (isNaN(recipeId)) {
		return Err(<ErrorPage caption={"Recipe ID is not a number"} />);
	}

	recipeId = parseInt(recipeId as any);

	return Ok({ recipeId, recipeRawTitle });
}

export async function searchForRecipes(
	query: string,
): Promise<Result<SearchedRecipe[], string>> {
	return fetch(`${apiUrl}/search/${query}`).then((res) => res.json());
}

export async function fetchRecipeInfo(
	recipeId: number,
	recipeRawTitle: string,
): Promise<Result<Result<SearchedRecipe, string>, JSX.Element>> {
	const response = await fetch(
		`${apiUrl}/recipe/${recipeId}/${recipeRawTitle}`,
	);

	const data: Result<SearchedRecipe, string> = await response.json();
	return Ok(data);
}
