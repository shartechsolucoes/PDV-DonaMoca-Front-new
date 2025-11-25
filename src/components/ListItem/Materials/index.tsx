import { BsEyeFill, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router';
import './index.css';
import useAccessLevelStore from '../../../stores/accessLevelStore.ts';

export default function ListItemOrders({
	title,
	id,
	group,
	deleteItem,
	showGroup = true,
	showStatus = false,
	showMedida,
	unit,
	status,
}: {
	title?: string;
	id?: number;
	group?: string;
	deleteItem: () => void;
	showGroup?: boolean;
	showMedida?: boolean;
	unit?: string;
	showStatus?: boolean;
	status?: string;
}) {
	const { accessLevel } = useAccessLevelStore();

	return (
		<>
			<div className="" style={{ borderBottom: '1px solid #f1efef' }}>
				<div className="row px-4 py-3">
					<div className="col-sm-4 col-md-4 d-flex justify-content-start align-items-center">
						<span>{title}</span>
					</div>
					<div className="col-sm-4 col-md-1 d-flex justify-content-center align-items-center">
						<span className="text-truncate d-flex align-items-center text-heading"></span>
					</div>
					<div className="col-sm-6 col-md-2 d-flex justify-content-start align-items-center">
						{showGroup && (
							<div className="d-flex align-items-center">
								<div className="d-flex flex-column">
									<span className="fw-medium">{group}</span>
								</div>
							</div>
						)}
					</div>
					{showMedida && (
						<div className="col-md-2 d-flex justify-content-center align-items-center">
							Medida: {unit === 'm' ? 'Metros' : 'Unidade'}
						</div>
					)}

					{showStatus && (
						<div className="col-md-1 d-flex justify-content-center align-items-center">
							<small
								className={`text-truncate d-none d-sm-block badge ${
									status ? 'bg-label-success' : 'bg-label-danger'
								}`}
							>
								{status ? 'Ativo' : 'Inativo'}
							</small>
						</div>
					)}

					<div className="col-md-2 d-flex justify-content-end align-items-center gap-3">
						{accessLevel === 0 && (
							<Link to={`/materials/form?id=${id}`}>
								<BsFillPencilFill />
							</Link>
						)}
						{accessLevel === 2 && (
							<Link to={`view?id=${id}`}>
								<BsEyeFill />
							</Link>
						)}
						{accessLevel === 0 && (
							<a onClick={deleteItem}>
								<BsFillTrashFill />
							</a>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
