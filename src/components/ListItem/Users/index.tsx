import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router';
import './index.css';
import useAccessLevelStore from '../../../stores/accessLevelStore.ts';
import Image from '../../Forms/Image/index.tsx';

export default function ListItemOrders({
	title,
	email,
	access_level,
	login,
	id,
	status,
	picture,
	name,
}: {
	title?: string;
	email?: string;
	access_level?: number;
	login?: string;
	id?: string;
	status?: boolean;
	picture?: string;
	name?: string;
}) {
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
	const { accessLevel } = useAccessLevelStore();

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

	return (
		<>
			<div className="" style={{ borderBottom: '1px solid #f1efef' }}>
				<div className="row px-4 py-3">
					<div className="col-sm-6 col-md-4 d-flex justify-content-start align-items-center">
						<div className="d-flex justify-content-start align-items-center">
							{/*<img*/}
							{/*	alt="John Michael"*/}
							{/*	src="https://themewagon.github.io/soft-ui-dashboard-react/static/media/team-2.e725aef8c892cb21f262.jpg"*/}
							{/*	className="img- img-thumbnail-small"*/}
							{/*/>*/}
							<div className="avatar-wrapper">
								<div className="avatar avatar-sm me-3">
									<span className="avatar-initial rounded-circle bg-label-dark overflow-hidden d-flex align-items-center justify-content-center ">
										{picture ? (
											<Image image={picture} />
										) : (
											getInitialsNames(name)
										)}
									</span>
								</div>
							</div>
							<div className="d-flex flex-column">
								<span className="fw-medium">{title}</span>
								<small className="text-truncate d-none d-sm-block">
									{email}
								</small>
							</div>
						</div>
					</div>
					<div className="col-sm-4 col-md-2 d-flex justify-content-start align-items-center">
						<a href="app-ecommerce-order-details.html">
							<span>{login}</span>
						</a>
					</div>
					<div className="col-sm-4 col-md-2 d-flex justify-content-center align-items-center">
						<span className="text-truncate d-flex align-items-center text-heading">
							{access(access_level)}
						</span>
					</div>

					<div className="col-md-2 d-flex flex-column justify-content-start align-items-center justify-content-center">
						<div className="d-flex flex-column">
							<small
								className={`text-truncate d-none d-sm-block badge ${
									status ? 'bg-label-success' : 'bg-label-danger'
								}`}
							>
								{status ? 'Ativo' : 'Inativo'}
							</small>
						</div>
					</div>
					<div className="col-md-2 d-flex justify-content-end align-items-center gap-3">
						{accessLevel === 0 && (
							<Link to={`form?id=${id}`}>
								<BsFillPencilFill />
							</Link>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
