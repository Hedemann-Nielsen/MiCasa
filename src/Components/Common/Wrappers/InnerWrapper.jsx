import style from "./InnerWrapper.module.scss";

// Bruges til at lave en "boks" hvor indholdet er indeni

export const InnerWrapper = ({ children }) => {
	return <section className={style.InnerWrapper}>{children}</section>;
};
