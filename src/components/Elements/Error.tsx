import {HeaderCenterLayout} from "@/components/Layouts/Center";

export function ErrorPage({
    title="An Error Has Occured",
	caption,
}: {
    title?: string;
	caption: string;
}) {
	return (
		<HeaderCenterLayout>
			<p className="text-5xl font-bold text-white"> {title} </p>
			<p className="text-xl font-normal text-dark-0 mt-2">
				{caption}
			</p>
        </HeaderCenterLayout>
	);
}
