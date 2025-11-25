import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import "./styles.css";
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import useAccessLevelStore from '../../stores/accessLevelStore';
import Notices from '../Cards/Notices';
import { IoMdNotifications } from 'react-icons/io';

const notices = [
	{
		title: 'Reunião de Pais',
		description: 'A reunião será realizada no dia 10/07 às 18h na sala 5.',
		date: '2025-07-10',
		color: '#ff9800',
	},
	{
		title: 'Prova de Matemática',
		description: 'A prova da 2ª unidade será dia 12/07. Estudem!',
		date: '2025-07-12',
		color: '#4caf50',
	},
];

export default function Navbar() {
	const navigate = useNavigate();
	const { userName, userAvatar } = useAccessLevelStore();
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const [toggleDropdownNotices, setToggleDropdownNotices] = useState(false);
	const [hasAvatar, setHasAvatar] = useState(false);
	// const toggleMenu = () => {
	// 	const r = document.documentElement;
	// 	r.style.cssText = '--menu-position: 0vw;';
	// };

	const logOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		localStorage.removeItem('userId');
		localStorage.removeItem('userAvatar');
		localStorage.removeItem('accessLevel');
		navigate('/login');
	};

	function getInitialsNames(completeName = '') {
		if (!completeName) {
			return '';
		}
		if (!completeName.includes(' ')) {
			return completeName[0];
		}
		const [primeiroNome, sobrenome] = completeName.split(' ');
		return primeiroNome[0] + sobrenome[0];
	}

	useEffect(() => {
		setHasAvatar(!!localStorage.getItem('userAvatar'));
	}, [userAvatar]);

	return (
		<>
			<nav
				className="pc-header"
				id="layout-navbar"
			>
				<div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
					<a
						className="nav-item nav-link px-0 me-xl-4 d-xl-none"
						// onClick={toggleMenu}
					>
						<i className="bx bx-menu bx-sm ">
							<IoMenu />
						</i>
					</a>
				</div>

				<div
					className="navbar-nav-right d-flex align-items-center"
					id="navbar-collapse"
				>
					<div className="navbar-nav align-items-center">
						<p className="hellow">Olá, {userName}!</p>
					</div>
					<ul className="navbar-nav flex-row align-items-center ms-auto">
						<li className="nav-item lh-1 me-3"></li>

						<li className="nav-item navbar-dropdown dropdown-user dropdown ">
							<a
								className="nav-link dropdown-toggle hide-arrow "
								data-bs-toggle="dropdown"
								onClick={() => setToggleDropdownNotices((prev) => !prev)}
							>
								<div
									className="avatar rounded-circle d-flex"
									style={{ overflow: 'hidden' }}
								>
									<div className="fw-medium h-100 w-100 d-flex align-items-center justify-content-center bg-label-dark">
										<IoMdNotifications />
									</div>
								</div>
							</a>

							<ul
								className={`dropdown-menu dropdown-menu-end ${
									styles.dropMenu
								} dropdown-menu-notices ${toggleDropdownNotices && 'show'}`}
							>
								{notices.map((n, i) => (
									<Notices
										key={i}
										title={n.title}
										description={n.description}
										date={n.date}
										color={n.color}
									/>
								))}
							</ul>
						</li>

						{/*Menu Usuário*/}
						<li className="nav-item navbar-dropdown dropdown-user dropdown ">
							<a
								className="nav-link dropdown-toggle hide-arrow "
								data-bs-toggle="dropdown"
								onClick={() => setToggleDropdown((prev) => !prev)}
							>
								<div
									className="avatar rounded-circle d-flex"
									style={{ overflow: 'hidden' }}
								>
									{hasAvatar ? (
										<img src={userAvatar} className="w-px-40 h-auto " />
									) : (
										<div className="fw-medium h-100 w-100 d-flex align-items-center justify-content-center bg-label-dark">
											{getInitialsNames(userName)}
										</div>
									)}
								</div>
							</a>

							<ul
								className={`dropdown-menu dropdown-menu-end drop-menu ${
									toggleDropdown && 'show'
								}`}
							>
								<li>
									<div className="dropdown-item">
										<i className="bx bx-power-off me-2"></i>
										<span className="align-middle">{userName}</span>
									</div>
								</li>
								<li>
									<div className="dropdown-divider"></div>
								</li>
								<li>
									<a className="dropdown-item" onClick={logOut}>
										<i className="bx bx-power-off me-2"></i>
										<span className="align-middle">Sair</span>
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
