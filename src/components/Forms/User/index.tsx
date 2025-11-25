import { useEffect, useState } from 'react';
import { api } from '../../../api';
import { useSearchParams } from 'react-router';

import './user.css';
import UpdatePassword from './components/updatePassword';
import DataRegister from './components/dataRegister';
import SideInfo from './components/sideInfo';
import Activities from './components/activities';

export default function UserForm() {
	const [formData, setFormData] = useState<{ [key: string]: any }>({});
	const [changeScreen, setChangeScreen] = useState(0);

	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	const getUser = async () => {
		const response = await api.get(`/user/${id}`);

		setFormData(response.data);
	};

	useEffect(() => {
		if (id) {
			getUser();
		}
	}, []);

	const screen = (screen: number) => {
		switch (screen) {
			case 0:
				return <Activities />;
			case 1:
				return (
					<DataRegister
						id={id}
						userData={formData}
						updateData={() => getUser()}
					/>
				);
			case 2:
				return <UpdatePassword id={id || ''} />;

			default:
				return <Activities />;
		}
	};

	return (
		<div className="row">
			<div className="col-xl-4 col-lg-5 order-1 order-md-0">
				<SideInfo formData={formData} id={id || ''} />
			</div>
			<div className="col-xl-8 col-lg-7 order-0 order-md-1">
				<div className="nav-align-top mb-3">
					<ul className="nav nav-pills flex-column flex-md-row mb-6 flex-wrap row-gap-2">
						<li className="nav-item">
							<a
								className={`nav-link ${changeScreen === 0 && 'active'}`}
								onClick={() => setChangeScreen(0)}
							>
								<i className="icon-base bx bx-user icon-sm me-1_5"></i>
								Atividades
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${changeScreen === 1 && 'active'}`}
								onClick={() => setChangeScreen(1)}
							>
								<i className="icon-base bx bx-lock-alt icon-sm me-1_5"></i>
								Editar dados
							</a>
						</li>
						{id && (
							<li className="nav-item">
								<a
									className={`nav-link ${changeScreen === 2 && 'active'}`}
									onClick={() => setChangeScreen(2)}
								>
									<i className="icon-base bx bx-detail icon-sm me-1_5"></i>
									Trocar Senha
								</a>
							</li>
						)}
					</ul>
				</div>

				{screen(changeScreen)}
			</div>
		</div>
	);
}
