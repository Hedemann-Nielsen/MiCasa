import { Layout } from "../Components/Layout/Layout";
import { PageWrapper } from "../Components/Common/Wrappers/PageWrapper.jsx";
import { Contact } from "../Components/Customers/Contact/Contact.jsx";

export const ContactPage = () => {
	return (
		<>
			<PageWrapper title={"Kontakt"}>
				<Contact />
			</PageWrapper>
		</>
	);
};
