// import { DetailedHTMLProps, HTMLAttributes } from "react";
// interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}


export const Footer = () => {
	return (
		<footer>
			<div className="footer_inner">
				<p>OwlTop © 2020 - 2021 Все права защищены</p>
				<div>
					<a href="#"><p>Пользовательское соглашение</p></a>
					<a href="#"><p>Политика конфиденциальности</p></a>
				
				</div>
			</div>
		</footer>
	);
};
