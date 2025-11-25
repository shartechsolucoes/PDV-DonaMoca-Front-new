import { NavLink, useNavigate } from 'react-router-dom'; // corrigido: react-router-dom
import { api } from '../../api';
import { useEffect, useState } from 'react';
import './index.css';
// @ts-ignore
import BadgeStatus from "../../components/Badge/Status";
import Avatar from "../../components/Image/avatar.tsx";
import Badge from "../../components/Badge/StatusPost/Index.tsx";
import {TbEyeSpark} from "react-icons/tb";
import {MdOutlineModeEditOutline} from "react-icons/md";

type UserType = {
	account_id: number;
	name: string;
	username: string;
	image_id: string;
	account_type_id: number;
	email: string;
	status: string;
	picture: string;
};

export default function Users() {
	const [users, setUsers] = useState<UserType[]>([]);useNavigate();

	const getUsers = async () => {
		try {
			const response = await api.get('/users');
			setUsers(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div>
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">Usuários</h2>
					<p className="url-page">Dashboard / Usuários</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<NavLink to="/users/new" className="btn btn-info" style={{ height: 'fit-content' }}>
						Adicionar
					</NavLink>
					<NavLink to="/users/search" className="btn btn-info" style={{ height: 'fit-content' }}>
						Buscar
					</NavLink>
				</div>
			</div>

			{/* Tabela dinâmica */}
			<div className="col-12 mt-5">

				{users.map((item) => (
					<div className="card mb-2">
						<div className="row g-0">
							<div className="col-12 col-md-10">
								<div className="card-body d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center justify-content-between">
										<Avatar
											image_id={item.image_id?.toString()}
											token={localStorage.getItem("token") || ""}
										/>
										<div>
											<h5 className="card-title">{item.name}</h5>
											<p className="card-text">{item.email}</p>
										</div>

									</div>
									<div className="mb-1 d-flex align-items-center justify-content-between">
										<Badge status={item.status} />
									</div>
									<div className="action">
										<a href="" className="btn btn-sm btn-primary"><TbEyeSpark /></a>
										<a href={`user/${item.account_id}`} className="btn btn-sm btn-primary">
											<MdOutlineModeEditOutline />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
