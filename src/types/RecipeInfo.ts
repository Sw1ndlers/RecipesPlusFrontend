export type RecipeInfo = {
	"@context": string;
	"@type": string[];
	headline: string;
	datePublished: Date;
	dateModified: Date;
	author: Author[];
	description: string;
    longDescription: string;
	image: LogoClass;
	video: Video;
	publisher: Publisher;
	name: string;
	aggregateRating: AggregateRating;
	cookTime: string;
	nutrition: Nutrition;
	prepTime: string;
	recipeCategory: string[];
	recipeCuisine: string[];
	recipeIngredient: string[];
	recipeInstructions: RecipeInstruction[];
	recipeYield: string[];
	totalTime: string;
	review: Review[];
	mainEntityOfPage: MainEntityOfPage;
	about: any[];
};

export type AggregateRating = {
	"@type": string;
	ratingValue: string;
	ratingCount: string;
};

export type Author = {
	"@type": AuthorType;
	name: string;
};

export enum AuthorType {
	Person = "Person",
}

export type LogoClass = {
	"@type": string;
	url: string;
	height: number;
	width: number;
};

export type MainEntityOfPage = {
	"@type": string[];
	"@id": string;
	breadcrumb: Breadcrumb;
	reviewedBy: ReviewedBy[];
};

export type Breadcrumb = {
	"@type": string;
	itemListElement: ItemListElement[];
};

export type ItemListElement = {
	"@type": string;
	position: number;
	item: Item;
};

export type Item = {
	"@id": string;
	name: string;
};

export type ReviewedBy = {
	"@type": AuthorType;
	name: string;
	url: string;
};

export type Nutrition = {
	"@type": string;
	calories: string;
	carbohydrateContent: string;
	cholesterolContent: string;
	fiberContent: string;
	proteinContent: string;
	saturatedFatContent: string;
	sodiumContent: string;
	sugarContent: string;
	fatContent: string;
	unsaturatedFatContent: string;
};

export type Publisher = {
	"@type": string;
	name: string;
	url: string;
	logo: LogoClass;
	brand: string;
	publishingPrinciples: string;
	sameAs: string[];
};

export type RecipeInstruction = {
	"@type": string;
	text: string;
	image?: ImageElement[];
};

export type ImageElement = {
	"@type": string;
	url: string;
};

export type Review = {
	"@type": ReviewType;
	reviewRating: ReviewRating;
	author: Author;
	reviewBody: string;
};

export enum ReviewType {
	Review = "Review",
}

export type ReviewRating = {
	"@type": ReviewRatingType;
	ratingValue: string;
};

export enum ReviewRatingType {
	Rating = "Rating",
}

export type Video = {
	"@type": string;
	contentUrl: string;
	description: string;
	duration: string;
	name: string;
	thumbnailUrl: string;
	uploadDate: Date;
};
