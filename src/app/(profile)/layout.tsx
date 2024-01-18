import Header from "@/components/Header/Header";
import { ProfileSidebar } from "./ProfileComponents";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			<div className="flex flex-row py-8 px-8">
				<ProfileSidebar />
				{children}
			</div>
		</div>
	);
}
