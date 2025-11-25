import {
	BsFillPencilFill,
	BsEyeFill,
	BsFillTrashFill,
	BsCopy,
} from 'react-icons/bs';
import { Link } from 'react-router';
import useAccessLevelStore from '../../../stores/accessLevelStore';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Status from '../../StatusOS/';
import Image from '../../Forms/Image';

export default function ListItemOrders({
	id,
	qrcode,
	address,
	neighborhood,
	city,
	state,
	status,
	date,
	deleteListItem,
	duplicateItem,
	kit,
	userName,
	userPicture,
}: {
	qrcode?: string;
	address?: string;
	neighborhood?: string;
	city?: string;
	state?: string;
	status: number;
	id?: string | number;
	date: Date;
	deleteListItem?: () => void;
	duplicateItem?: () => void;
	kit?: string;
	userName?: string;
	userPicture?: string;
}) {
	const { accessLevel } = useAccessLevelStore();
	const formattedDate = date ? format(date, 'dd/MM/yy', { locale: ptBR }) : '';

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

	return (
		<>
			<div className="" style={{ borderBottom: '1px solid #f1efef' }}>
				<div className="row px-4 py-3">
					<div className="col-6 col-sm-6 col-md-1 d-flex justify-content-start align-items-center">
						<a href="">
							<span className="text-os">#{qrcode}</span>
						</a>
					</div>
					<div className="col-6 col-sm-6 col-md-1 d-flex justify-content-end justify-content-md-end align-items-center">
						<span className="text-truncate d-flex align-items-center text-heading text-date">
							{formattedDate}
						</span>
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
					<div className="col-md-1 d-flex justify-content-end align-items-center gap-1 ">
						{(accessLevel === 2 || accessLevel === 1 || accessLevel === 0) && (
							<Link to={`view?id=${id}`} className="d-none d-md-flex action">
								<BsEyeFill />
							</Link>
						)}

						{(accessLevel === 0 || (accessLevel === 2 && status !== 2)) && (
							<Link to={`form?id=${id}`}>
								<BsFillPencilFill />
							</Link>
						)}

						{accessLevel === 0 && (
							<a className="d-none d-md-flex action" onClick={deleteListItem}>
								<BsFillTrashFill />
							</a>
						)}
						{accessLevel === 0 && (
							<a className="d-none d-md-flex action" onClick={duplicateItem}>
								<BsCopy />
							</a>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
