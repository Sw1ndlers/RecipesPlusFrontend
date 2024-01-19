import Header from "@/components/Header/Header";
import { ProfileSidebar } from "./ProfileComponents";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col w-screen h-screen">
			<Header />

			<div className="flex flex-row py-8 px-8 flex-gorw  ">
                <ProfileSidebar />

				<div className="flex h-full w-full flex-row gap-12 px-5 py-10">
					{children}
				</div>
			</div>

		</div>
	);
}
