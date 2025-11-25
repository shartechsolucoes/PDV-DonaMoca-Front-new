import { useState } from 'react';
import { api } from '../../../../../api';
import useAccessLevelStore from '../../../../../stores/accessLevelStore';

export default function SideInfo({
	formData,
	id,
}: {
	formData: any;
	id: string;
}) {
	const { userId, handleUserAvatar, updateNavAvatar, getAvatar } =
		useAccessLevelStore();
	const [avatar, setAvatar] = useState('');

	function access(access_level: number | undefined) {
		switch (access_level) {
			case 0:
				return 'Administrador';
			case 1:
				return 'Administrativo';
			case 2:
				return 'Funcionário';
			case 3:
				return 'Externo';
			default:
				return '';
		}
	}

	const uploadAvatar = async (e: any) => {
		const data = new FormData();

		data.append('file', e.target.files[0]);

		const response = await api.post(`/avatar?id=${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		if (id === userId) {
			handleUserAvatar(response.data.file);
		}

		updateNavAvatar();
		if (!id) {
			getAvatar(response.data.file);
		}
		setAvatar(response.data.file);
	};

	return (
		<div className="card mb-6">
			<div className="card-body pt-12">
				<div className="user-avatar-section">
					<div className=" d-flex align-items-center flex-column">
						{avatar || formData.picture ? (
							<img
								className="img-fluid rounded mb-4"
								src={
									avatar
										? `${import.meta.env.VITE_API_URL}${avatar}`
										: `${import.meta.env.VITE_API_URL}${formData.picture}`
								}
								height="120"
								width="120"
								alt="User avatar"
							/>
						) : (
							<span style={{ height: '120px' }}></span>
						)}
						<label className="btn btn-primary" htmlFor="avatar-upload">
							Inserir Foto
						</label>
						<input
							style={{ display: 'none' }}
							id="avatar-upload"
							type="file"
							onChange={uploadAvatar}
							accept="image/png, image/jpeg"
						/>
						<div className="user-info text-center">
							<h5 className="mt-3">{formData.name}</h5>
							<span className="badge bg-label-secondary">
								{access(formData.access_level)}
							</span>
						</div>
					</div>
				</div>

				<h5 className="pb-4 border-bottom mb-4">Detalhes</h5>
				<div className="info-container">
					<ul className="list-unstyled mb-6">
						<li className="mb-2">
							<span className="h6">Username:</span>
							<span> {formData.login}</span>
						</li>
						<li className="mb-2">
							<span className="h6">Email:</span>
							<span> {formData.email}</span>
						</li>
						<li className="mb-2">
							<span className="h6">Telefone:</span>
							<span> {formData.phone}</span>
						</li>

						<li className="mb-2">
							<span className="h6">Status:</span>
							<span> {formData.status ? 'Ativo' : 'Inativo'}</span>
						</li>
						<li className="mb-2">
							<span className="h6">Endereço:</span>
							<span> {formData.address}</span>
						</li>
						<li className="mb-2">
							<span className="h6">Bairro:</span>
							<span> {formData.neighborhood}</span>
						</li>

						<li className="mb-2">
							<span className="h6">Cidade:</span>
							<span> {formData.city}</span>
						</li>
						<li className="mb-2">
							<span className="h6">Estado:</span>
							<span> {formData.state}</span>
						</li>
					</ul>
					{/* <div className="d-flex justify-content-center">
						<a
							href="javascript:;"
							className="btn btn-label-danger suspend-user"
						>
							Suspend
						</a>
					</div> */}
				</div>
			</div>
		</div>
	);
}
