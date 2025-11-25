import './index.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ListItemOrders({
	title,
	used,
	date,
	selectedList,
	registeredDay,
	selectItem,
}: {
	title?: string;
	date?: Date;
	registeredDay?: Date;
	selectedList?: string[];
	group?: string;
	used?: boolean;
	deleteItem: () => void;
	selectItem: (e: string) => void;
}) {
	return (
		<>
			<div className="" style={{ borderBottom: '1px solid #f1efef' }}>
				<div className="row px-4 py-3">
					<div className="col-sm-6 col-md-2 d-flex justify-content-start align-items-center">
						<div className="d-flex justify-content-start align-items-center">
							<div className="avatar-wrapper">
								<div className="avatar avatar-sm me-3  justify-content-center align-items-center d-flex">
									<input
										className="form-check-input m-0"
										type="checkbox"
										checked={selectedList?.some((item) => item === title)}
										onChange={() => selectItem(title || '')}
									/>
								</div>
							</div>
							<div className="d-flex flex-column">
								<span className="fw-medium">{title}</span>
							</div>
						</div>
					</div>
					<div className="col-sm-4 col-md-4 d-flex justify-content-start align-items-center">
						<span>
							{date
								? `Criado: ${format(date, 'dd/MM/yy', { locale: ptBR })}`
								: ''}
						</span>
					</div>
					<div className="col-sm-4 col-md-4 d-flex justify-content-start align-items-center">
						<span>
							{registeredDay
								? `Utilizado: ${format(registeredDay, 'dd/MM/yy', {
										locale: ptBR,
								  })}`
								: ''}
						</span>
					</div>
					<div className="col-sm-4 col-md-2 d-flex justify-content-center align-items-center">
						<span className="text-truncate d-flex align-items-center text-heading">
							{used ? (
								<span className="badge bg-label-info" text-capitalized="">
									Usada
								</span>
							) : (
								<span className="badge bg-label-success text-capitalized">
									{' '}
									Livre{' '}
								</span>
							)}
						</span>
					</div>
					{/* <div className="col-md-2 d-flex justify-content-end align-items-center gap-3">
						{accessLevel === 0 && (
							<Link to={`form?id=${id}`}>
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
					</div> */}
				</div>
			</div>
		</>
	);
}
