import { PageWrapper } from "../Components/Common/Wrappers/PageWrapper.jsx";
import { Fallback } from "../Components/Customers/Fallback/Fallback.jsx";

export const FallbackPage = () => {
	return (
		<>
			<PageWrapper title={"fallback"}>
				<Fallback />
			</PageWrapper>
		</>
	);
};
