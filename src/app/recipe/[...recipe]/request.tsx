import ErrorPage from "@/components/elements/Error";
import { Err, Ok, Result } from "@/types/Results";

export function getUrlInfo({
	recipeParams,
}: {
	recipeParams: [number, string];
}): Result<
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

