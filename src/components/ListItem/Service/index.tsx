import { BsEyeFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router';
import useAccessLevelStore from '../../../stores/accessLevelStore';
import Status from '../../StatusOS';
import Image from '../../Forms/Image';
import { FaPen, FaPlay, FaPlus} from 'react-icons/fa';

export type ListItemServiceProps = {
	id: number;
	protocolNumber?: string;
	address: string;
	neighborhood: string;
	city: string;
	state: string;
	status?: number;
	userId?: string;
	kit?: string;
	userName?: string;
	userPicture?: string;
	startOs?: boolean;
	deleteListItem?: () => void;
	attachUser?: ({}) => void;
};

export default function ListItemService({
	address,
	id,
	neighborhood,
	city,
	state,
	status = 0,
	kit,
	userName,
	userPicture,
	protocolNumber,
	userId,
	startOs,
	deleteListItem,
	attachUser,
}: ListItemServiceProps) {
	const { accessLevel } = useAccessLevelStore();

	function pegarPrimeirasLetras(completeName = '') {
		if (!completeName.includes(' ')) {
			return completeName[0];
		}
		const [primeiroNome, sobrenome] = completeName.split(' ');
		return primeiroNome[0] + sobrenome[0];
	}

	return (
		<div className="" style={{ borderBottom: '1px solid #f1efef' }}>
			<div className="row px-4 py-3">
				<div className="col-6 col-sm-6 col-md-1 d-flex justify-content-start align-items-center">
					<a href="">
						<span className="text-os">#{protocolNumber}</span>
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
						<h6 className="mb-0">{address}</h6>
						<small className="text-truncate">
							{neighborhood} - {city}/{state}
						</small>
					</div>
				</div>
				<div className="d-none d-md-flex col-md-1 d-flex justify-content-center align-items-center">
					<Status statusOS={status ?? 0} />
				</div>
				<div className="col-md-2 d-flex justify-content-end align-items-center gap-3">
					{accessLevel === 0 && !startOs && (
						<a className="d-none d-md-flex action" onClick={deleteListItem}>
							<BsFillTrashFill />
						</a>
					)}
					{accessLevel === 0 && status === 0 && !startOs && (
						<Link to={`form?id=${id}`}>
							<FaPen />
						</Link>
					)}
					{/* {(accessLevel === 2 || accessLevel === 0) && ( */}
					<Link to={`view?id=${id}`}>
						<BsEyeFill />
					</Link>
					{/* )} */}
					{accessLevel === 2 && startOs && status === 0 && (
						<Link to={`/orders/form?&protocol=${id}`}>
							<FaPlay />
						</Link>
					)}
					{accessLevel === 2 && !userId && (
						<a
							onClick={() =>
								attachUser?.({
									address,
									id,
									neighborhood,
									city,
									state,
									status,
									kit,
									userName,
									userPicture,
									protocolNumber,
									userId,
									startOs,
								})
							}
						>
							<FaPlus />
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
