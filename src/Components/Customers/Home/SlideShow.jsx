import { useEffect, useState } from "react";
import slide1 from "../../../Assets/SlideImg/slide-1.webp";
import slide2 from "../../../Assets/SlideImg/slide-2.webp";
import slide3 from "../../../Assets/SlideImg/slide-3.webp";
import slide4 from "../../../Assets/SlideImg/slide-4.webp";
import slide5 from "../../../Assets/SlideImg/slide-5.webp";
import slide6 from "../../../Assets/SlideImg/slide-6.webp";

import style from "./SlideShow.module.scss";

const images = [slide1, slide2, slide3, slide4, slide5, slide6];

export const SlideShow = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	//Funktion til at få billederne til at skifte får hver 10 sekunder
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={style.slideshowContainer}>
			<section className={style.slideshow}>
				{/* looper iggenem arrayet af billder (images)*/}
				{images &&
					images.map((image, index) => (
						<div
							key={index}
							className={`${style.slide} ${
								index === currentIndex && style.active
							}`}
							style={{ backgroundImage: `url(${image})` }}></div>
					))}
			</section>
		</div>
	);
};
