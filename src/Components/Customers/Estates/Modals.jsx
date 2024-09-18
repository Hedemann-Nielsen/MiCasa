import { IconsModal } from "../../Modal/IconsModal";
import { IoCloseSharp } from "react-icons/io5";

import globalStyle from "../../../Styles/Globalstyles.module.scss";

/* modal indhold til gallery icon*/
export const ModalForPhoto = ({
	photomodalIsOpen,
	closePhotoModal,
	imageUrl,
	estateAddress,
}) => (
	<IconsModal isOpen={photomodalIsOpen} onRequestClose={closePhotoModal}>
		<div className={globalStyle.iconModal}>
			<div className={globalStyle.closeIcsonWrapper} onClick={closePhotoModal}>
				<IoCloseSharp className={globalStyle.closeIcon} />
			</div>
			<img src={imageUrl} alt={estateAddress} />
		</div>
	</IconsModal>
);

/* modal indhold til plantegning icon*/
export const ModalForFloorPlan = ({
	isOpen,
	closeModal,
	floorPlanUrl,
	estateAddress,
}) => (
	<IconsModal isOpen={isOpen} onRequestClose={closeModal}>
		<div className={globalStyle.iconModal}>
			<div className={globalStyle.closeIcsonWrapper} onClick={closeModal}>
				<IoCloseSharp className={globalStyle.closeIcon} />
			</div>
			<img src={floorPlanUrl} alt={estateAddress} />
		</div>
	</IconsModal>
);

/* modal indhold til location icon*/
export const ModalForLocation = ({ isOpen, closeModal, mapsUrl }) => (
	<IconsModal isOpen={isOpen} onRequestClose={closeModal}>
		<div className={globalStyle.iconModal}>
			<div className={globalStyle.closeIcsonWrapper} onClick={closeModal}>
				<IoCloseSharp className={globalStyle.closeIcon} />
			</div>
			<iframe
				width="600"
				height="450"
				style={{ border: 0 }}
				src={mapsUrl}
				allowFullScreen
				aria-hidden="false"
				tabIndex="0"></iframe>
		</div>
	</IconsModal>
);
