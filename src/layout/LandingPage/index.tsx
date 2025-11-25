import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { MENU } from './data';

export default function LandingPageLayout() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<div className="container landingPage">
			<nav className="navbar navbar-expand-lg">
				<a className="navbar-brand" href="#">
					<div className="app-brand d-block">
						<p>Fast</p>
						<p className="induca">Mananger</p>
					</div>
				</a>

				<button
					className="navbar-toggler"
					type="button"
					onClick={toggleMenu}
					aria-controls="navbarSupportedContent"
					aria-expanded={isOpen}
					aria-label="Alternar navegação"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className={`collapse navbar-collapse justify-content-end gap-3 ${
						isOpen ? 'show' : ''
					}`}
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav ms-auto">
						{MENU.map((menu) => (
							<li className="nav-item">
								<NavLink className="nav-link" to={menu.router}>
									{menu.title}
								</NavLink>
							</li>
						))}
						<li className="nav-item">
							<a className="btn btn-outline-primary mx-1" href="register">
								Cadastrar
							</a>
						</li>
						<li className="nav-item">
							<a className="btn btn-info text-white mx-1" href="login">
								Login
							</a>
						</li>
					</ul>
				</div>
			</nav>

			<section className="section contact__v2" id="contact">
				<div className="container">
					<div className="row">
						<Outlet />
					</div>
				</div>
			</section>

			<footer className="text-light pt-5 pb-4">
				<div className="container text-md-left">
					<div className="row">

						<div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
							<h6 className="text-uppercase fw-bold">FastMananger</h6>
							<hr className="mb-3 mt-0 d-inline-block mx-auto"/>
							<p>Transformamos sua gestão em algo inteligente e eficiente com soluções modernas e
								personalizadas.</p>
						</div>

						<div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
							<h6 className="text-uppercase fw-bold">Links</h6>
							<hr className="mb-3 mt-0 d-inline-block mx-auto"/>
							<p><a href="#servicos" className="text-light text-decoration-none">Serviços</a></p>
							<p><a href="#sobre" className="text-light text-decoration-none">Sobre</a></p>
							<p><a href="#contato" className="text-light text-decoration-none">Contato</a></p>
							<p><a href="#planos" className="text-light text-decoration-none">Planos</a></p>
						</div>

						<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
							<h6 className="text-uppercase fw-bold">Contato</h6>
							<hr className="mb-3 mt-0 d-inline-block mx-auto"/>
							<p><i className="fas fa-home me-2"></i> Rua Exemplo, 123 - Cidade</p>
							<p><i className="fas fa-envelope me-2"></i> contato@fastmananger.com</p>
							<p><i className="fas fa-phone me-2"></i> +55 (11) 99999-9999</p>
						</div>

					</div>

					<div className="text-center mt-4">
						<a href="#" className="btn btn-outline-light btn-floating m-1"><i
							className="fab fa-facebook-f"></i></a>
						<a href="#" className="btn btn-outline-light btn-floating m-1"><i
							className="fab fa-instagram"></i></a>
						<a href="#" className="btn btn-outline-light btn-floating m-1"><i
							className="fab fa-linkedin-in"></i></a>
					</div>

					<div className="text-center mt-3">
						<small>© 2025 Shartech. Todos os direitos reservados.</small>
					</div>
				</div>
			</footer>
		</div>
	);
}
