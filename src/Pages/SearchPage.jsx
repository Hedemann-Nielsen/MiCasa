import { PageWrapper } from "../Components/Common/Wrappers/PageWrapper";
import { Search } from "../Components/Customers/Search/Search";

export const SearchPage = () => {
	return (
		<>
			<PageWrapper title={"Søgning"}>
				<Search />
			</PageWrapper>
		</>
	);
};
