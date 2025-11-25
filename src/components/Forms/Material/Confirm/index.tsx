interface IConfirmProps {
	data: {
		name: string;
		unit: string;
		type: string;
		observations: string;
	};
}

export default function Confirm({ data }: IConfirmProps) {
	return (
		<div className="row">
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Nome</label>
				<p>{data.name}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Unidade</label>
				<p>{data.unit}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Tipo</label>
				<p>{data.type}</p>
			</div>
			<div className="mb-3 col-12">
				<label className="form-label">Observação</label>
				<p>{data.observations}</p>
			</div>
		</div>
	);
}
