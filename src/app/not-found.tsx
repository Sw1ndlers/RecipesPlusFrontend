import CenterLayout from "@/components/Positioning/Center"

export default function Custom404() {
	return (
		<CenterLayout>
			<p className="text-5xl font-bold text-white"> 404 Not Found </p>
			<p className="text-xl font-normal text-dark-0 mt-2">
				Sorry, we can&apos;t find that page
			</p>
        </CenterLayout>
	);
}
