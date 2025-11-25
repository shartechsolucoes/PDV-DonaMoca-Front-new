import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router';
import './index.css';
import useAccessLevelStore from '../../../stores/accessLevelStore.ts';

export default function ListItemOrders({
	title,
	id,
	status,
	showStatus = true,
	deleteListItem,
}: {
	title?: string;
	id?: string;
	status?: boolean;
	showStatus?: boolean;
	deleteListItem?: () => void;
}) {
	const { accessLevel } = useAccessLevelStore();
	return (
		<div className="" style={{ borderBottom: '1px solid #f1efef' }}>
			<div className="row px-4 py-3">
				<div
					className={`col-sm-10 ${
						showStatus ? 'col-md-8' : 'col-md-10'
					} d-flex justify-content-start align-items-center`}
				>
					<a href="app-ecommerce-order-details.html">
						<span>{title}</span>
					</a>
				</div>
				{showStatus && (
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
				)}

				<div className="col-md-2 d-flex justify-content-end align-items-center gap-3">
					{accessLevel === 0 && (
						<Link to={`/kits/form?id=${id}`}>
							<BsFillPencilFill />
						</Link>
					)}
					{accessLevel === 0 && (
						<a className="" onClick={deleteListItem}>
							<BsFillTrashFill />
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
