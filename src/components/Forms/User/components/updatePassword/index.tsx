import { useState } from 'react';
import { api } from '../../../../../api';
import Toast from '../../../../Toast';

export default function UpdatePassword({ id }: { id: string | null }) {
	const [passwordData, setPasswordData] = useState<{
		oldPassword: string;
		newPassword: string;
		confirmPassword: string;
	}>({ oldPassword: '', newPassword: '', confirmPassword: '' });
	const [passwordError, setPasswordError] = useState(false);
	const [openToast, setOpenToast] = useState(false);
	const [success, setSuccess] = useState(true);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const setNewPassword = async () => {
		setPasswordError(false);
		const regex = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$'
		);
		console.log(passwordData);
		console.log(regex.test(passwordData.newPassword));
		if (
			(passwordData.newPassword !== passwordData.confirmPassword &&
				!regex.test(passwordData.newPassword)) ||
			passwordData.oldPassword === '' ||
			passwordData.newPassword === ''
		) {
			setPasswordError(true);
			return;
		}

		console.log('passou');
		try {
			await api.put('reset-password', {
				userId: id,
				oldPassword: passwordData.oldPassword,
				newPassword: passwordData.newPassword,
			});
			setSuccess(true);
			setOpenToast(true);
			setSuccessMsg('Salvo com sucesso');

			setTimeout(() => {
				setSuccessMsg('');
				setErrorMsg('');
				setOpenToast(false);
			}, 1300);
		} catch (error) {
			console.log(error);
			setPasswordError(true);
			setSuccess(false);
			setOpenToast(true);
			setTimeout(() => {
				setSuccessMsg('');
				setErrorMsg('');
				setOpenToast(false);
			}, 1300);
		}
	};
	return (
		<div className="card">
			{openToast && (
				<Toast success={success} msgSuccess={successMsg} msgError={errorMsg} />
			)}
			<h5 className="card-header">Trocar Senha</h5>
			<div className="card-body">
				<div className="row">
					<div className="text-start col-md-7">
						<div className="mb-3 col-md-12">
							<label htmlFor="login" className="form-label">
								Antiga Senha
							</label>
							<input
								type="password"
								className="form-control"
								id="oldPassword"
								onChange={(e) =>
									setPasswordData((prev) => ({
										...prev,
										[e.target.id]: e.target.value,
									}))
								}
							/>
						</div>
						<div className="mb-3 col-md-12">
							<label htmlFor="login" className="form-label">
								Nova Senha
							</label>
							<input
								type="password"
								className="form-control"
								id="newPassword"
								onChange={(e) =>
									setPasswordData((prev) => ({
										...prev,
										[e.target.id]: e.target.value,
									}))
								}
							/>
						</div>

						<div className="mb-3 col-md-12">
							<label htmlFor="login" className="form-label">
								Confirmação de Senha
							</label>
							<input
								type="password"
								className="form-control"
								id="confirmPassword"
								onChange={(e) =>
									setPasswordData((prev) => ({
										...prev,
										[e.target.id]: e.target.value,
									}))
								}
							/>
							{passwordError && (
								<p className="text-danger">
									Senha não corresponde ou não contempla as regras{' '}
								</p>
							)}
						</div>
						<button
							type="button"
							className="btn btn-primary"
							id="password"
							onClick={setNewPassword}
						>
							Salvar
						</button>
					</div>

					<div className="text-end col-md-5">
						<div className="alert alert-warning alert-dismissible" role="alert">
							<h5 className="alert-heading mb-1">
								Guia para criação de senha forte
							</h5>
							<br></br>
							<span>Um caractere especial (!@#$%^&*(),./)</span>
							<br></br>
							<span>Uma letra maiúscula</span>
							<br></br>
							<span>Uma letra minuscula</span>
							<br></br>
							<span>Mínimo 6 caracteres</span>
							<br></br>
							<span>Um número (2 são recomendados)</span>
							<br></br>
							<span>Mude com frequencia</span>
							<br></br>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="alert"
								aria-label="Close"
							></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
