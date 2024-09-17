import { HomePageWrapper } from "../Components/Common/Wrappers/HomePageWrapper";
import { Home } from "../Components/Customers/Home/Home";
export const HomePage = () => {
	return (
		<>
			<HomePageWrapper title={"Home"}>
				<Home />
			</HomePageWrapper>
		</>
	);
};
