import { NavLink } from 'react-router';
import { privateRoutes, RouteItem } from '../../routes/PrivateRoutes';
import './styles.css';
import useAccessLevelStore from '../../stores/accessLevelStore';
import Navbar from 'react-bootstrap/Navbar';

import {useEffect, useState} from 'react';
import {LuBookOpen, LuBuilding,
	LuChartNoAxesColumn, LuLayoutDashboard, LuNewspaper,
	LuPlane,LuSquareUser, LuFile,
	LuRocket, LuTags, LuTrophy, LuUsersRound, LuVote,
    LuShoppingBasket,
    LuCoffee} from "react-icons/lu";
import {LiaConnectdevelop} from "react-icons/lia";

export default function Sidebar() {
	const { accessLevel } = useAccessLevelStore();

	const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

	const toggleMenu = () => {
		const r = document.documentElement;
		r.style.cssText = '--menu-position: -100vw;';
	};

	const toggleSubmenu = (name: string) => {
		setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
	};

	function icons(icon: string): JSX.Element {
		switch (icon) {
			case 'dashboard':
				return <LuLayoutDashboard className="menu-icon tf-icons" />;
			case 'vote':
				return <LuVote className="menu-icon tf-icons" />;
			case 'ranking':
				return <LuTrophy className="menu-icon tf-icons" />;
			case 'news':
				return <LuNewspaper	className="menu-icon tf-icons" />;
			case 'category':
				return <LuTags className="menu-icon tf-icons" />;
			case 'account':
				return <LuUsersRound className="menu-icon tf-icons" />;
			case 'banner':
				return <LuRocket className="menu-icon tf-icons" />;
			case 'event':
				return <LuPlane className="menu-icon tf-icons" />;
			case 'book':
				return <LuBookOpen className="menu-icon tf-icons" />;
			case 'company':
				return <LuBuilding className="menu-icon tf-icons" />;
			case 'author':
				return <LuSquareUser className="menu-icon tf-icons" />;
			case 'files':
				return <LuFile className="menu-icon tf-icons" />;
			case 'charts':
				return <LuChartNoAxesColumn className="menu-icon tf-icons"/>;
			case 'shopp':
				return <LuShoppingBasket className="menu-icon tf-icons"/>;
			case 'products':
				return <LuCoffee className="menu-icon tf-icons"/>;
			default:
				return <LiaConnectdevelop className="menu-icon tf-icons" />;
		}
	}
	useEffect(() => {
		const initial: Record<string, boolean> = {};
		privateRoutes.forEach(route => {
			if (route.children) {
				initial[route.name] = true; // todos abertos
			}
		});
		setOpenSubmenus(initial);
	}, []);

	return (
		<>
			{['md'].map((expand) => (
				<Navbar
					key={expand}
					expand={expand}
					className="pc-sidebar"
				>
					<div className="navbar-wrapper">
						<div className="m-header">
							<a className="b-brand" href="">
								<LuCoffee />
								<span>DonaMoça</span>
							</a>
						</div>
						<div className="navbar-content next-scroll"></div>
					</div>


					<div className="menu-inner-shadow"></div>

					<ul className="pc-navbar -flush">
						{privateRoutes.map((route: RouteItem, index: number) =>
							route.access.includes(accessLevel) ? (
								<li key={index} className="pc-item">
									{route.children ? (
										<>
											<a
												className="pc-link menu-toggle"
												aria-current="page"
												onClick={() =>
													toggleSubmenu(
														route.name
													)
												}
											>
												<div className="pc-title-section">{route.name}</div>
											</a>

											{openSubmenus[route.name] && (
												<ul
													className={`menu-sub ${
														openSubmenus[route.name] ? 'opens' : ''
													}`}
												>
													{route.children?.map((sub: RouteItem, idx: number) =>
														sub.access.includes(accessLevel) ? (
															sub.visible ? (
																<li key={idx} className="">
																	<NavLink
																		to={sub.path}
																		className="pc-link"
																		onClick={toggleMenu}
																	>
																		<div className="pc-micon">{icons(sub.icon)}</div>
																		<div className="pc-mtext">{sub.name}</div>
																	</NavLink>
																</li>
															) : null
														) : null
													)}
												</ul>
											)}
										</>
									) : (
										<NavLink
											className={'pc-link'}
											aria-current="page"
											to={route.path}
											onClick={toggleMenu}
										>
											<div className="pc-micon">{icons(route.icon)}</div>
											<div className="pc-mtext">{route.name}</div>
										</NavLink>
									)}
								</li>
							) : null
						)}
					</ul>
				</Navbar>
			))}
		</>
	);
}
