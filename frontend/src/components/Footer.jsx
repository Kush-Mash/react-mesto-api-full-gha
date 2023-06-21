import React from 'react';

function Footer() {
	return (
		<footer className="footer">
			<p className="footer__copyright" lang="en">
				&copy;&nbsp;{new Date().getFullYear()}&nbsp;Mesto&nbsp;Russia
			</p>
		</footer>
	);
};

export default Footer;