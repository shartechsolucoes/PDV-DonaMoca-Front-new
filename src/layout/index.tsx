import { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import './index.css';
import './form.css';
import './card.css';

import { Outlet, useNavigate } from 'react-router';

import useAccessLevelStore from '../stores/accessLevelStore';

export default function Layout() {
	const navigate = useNavigate();
	const { handleAccessLevel, handleUserName, handleUserId } =
		useAccessLevelStore();
	const [token, setToken] = useState(localStorage.getItem('token') || '');

	const initializer = async () => {
		await setToken(localStorage.getItem('token') || '');
	};
	useEffect(() => {
		initializer();
		if (!token) {
			navigate('/login');
		}

		handleAccessLevel(parseInt(localStorage.getItem('accessLevel') || ''));
		handleUserName(localStorage.getItem('userName') || '');
		handleUserId(localStorage.getItem('userId') || '');
	}, []);

	return (
		<>
			{token && (
				<>
				<Navbar />
				<Sidebar />

				<div className="pc-container">
						<div className="pcoded-content">
							<Outlet />
						</div>
				</div>
				</>
			)}
		</>
	);
}
