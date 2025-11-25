import { BsEyeFill, BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router';

import useAccessLevelStore from '../../../stores/accessLevelStore';

import Status from '../../StatusOS';
import Image from '../../Forms/Image';

export default function ListItemOrders({
	address,
	id,
	qrcode,
	neighborhood,
	city,
	state,
	status,
	kit,
	userName,
	userPicture,
}: {
	qrcode?: string;
	address?: string;
	neighborhood?: string;
	city?: string;
	register?: string;
	state?: string;
	id?: string | number;
	status?: number;
	kit?: string;
	userName?: string;
	userPicture?: string;
}) {
	const { accessLevel } = useAccessLevelStore();
	function pegarPrimeirasLetras(completeName = '') {
		if (!completeName) {
			return '';
		}
		if (!completeName.includes(' ')) {
			return completeName[0];
		}
		const [primeiroNome, sobrenome] = completeName.split(' ');
		return primeiroNome[0] + sobrenome[0];
	}
	// const date  = register ? format(register, "HH:mm:ss", {locale:ptBR} ): '';

	return (
		<>
			<div className="" style={{ borderBottom: '1px solid #f1efef' }}>
				<div className="row px-4 py-3">
					<div className="col-6 col-sm-6 col-md-1 d-flex justify-content-start align-items-center">
						<a href="">
							<span className="text-os">#{qrcode}</span>
						</a>
					</div>
					<div className="d-none d-md-flex col-sm-6 col-md-2 d-flex justify-content-center align-items-center">
						<span className="text-truncate d-flex align-items-center text-heading">
							{kit}
						</span>
					</div>
					<div className="d-none d-md-flex col-md-2 d-flex justify-content-start align-items-center">
						<div className="d-flex justify-content-start align-items-center">
							<div className="avatar-wrapper">
								<div className="avatar avatar-sm me-3">
									<span className="avatar-initial rounded-circle bg-label-dark overflow-hidden">
										{userPicture ? (
											<Image image={userPicture} />
										) : (
											<span>{pegarPrimeirasLetras(userName)}</span>
										)}
									</span>
								</div>
							</div>
							<div className="d-flex flex-column">
								<span className="fw-medium">{userName}</span>
							</div>
						</div>
					</div>

					<div className="col-sm-12 col-md-4 d-flex flex-column justify-content-start align-items-start">
						<div className="d-flex flex-column">
							<h6 className=" mb-0">{address}</h6>
							<small className="text-truncate">
								{neighborhood} - {city}/{state}
							</small>
						</div>
					</div>
					<div className="d-none d-md-flex col-md-1 d-flex justify-content-center align-items-center">
						<Status statusOS={status} />
					</div>

					<div className="col-md-2 d-flex justify-content-end align-items-center gap-3">
						{accessLevel === 2 ||
							(accessLevel === 0 && (
								<Link to={`orders/view?id=${id}`}>
									<BsEyeFill />
								</Link>
							))}
						{accessLevel === 0 && (
							<Link to={`orders/form?id=${id}`}>
								<BsFillPencilFill />
							</Link>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
