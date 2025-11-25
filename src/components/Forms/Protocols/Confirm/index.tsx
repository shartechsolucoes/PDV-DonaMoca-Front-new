interface IConfirmProps {
	applicant: {
		name: string;
		cpf: string;
		phone: string;
		request: string;
	};
	address: {
		cep: string;
		address: string;
		number: string;
		neighborhood: string;
		city: string;
		state: string;
	};
	requestDetails: {
		serviceType: string;
		team: string;
		status: string;
		startDate: string;
		endDate: string;
		timeSpent: string;
		materials: string[]; // exemplo: ['Material 1 - 10und', 'Material 2 - 5und']
		observations: string;
	};
}

export default function Confirm({
	applicant,
	address,
	requestDetails,
}: IConfirmProps) {
	return (
		<div className="row">
			{/* Dados do solicitante */}
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Nome</label>
				<p>{applicant.name}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">CPF</label>
				<p>{applicant.cpf}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Telefone/Celular</label>
				<p>{applicant.phone}</p>
			</div>
			<div className="mb-3 col-12">
				<label className="form-label">Solicitação</label>
				<p>{applicant.request}</p>
			</div>

			<hr />

			{/* Endereço */}
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">CEP</label>
				<p>{address.cep}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Endereço</label>
				<p>{address.address}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Número</label>
				<p>{address.number}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Bairro</label>
				<p>{address.neighborhood}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Cidade</label>
				<p>{address.city}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Estado</label>
				<p>{address.state}</p>
			</div>

			<hr />

			{/* Detalhes do serviço */}
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Tipo de Serviço</label>
				<p>{requestDetails.serviceType}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Equipe</label>
				<p>{requestDetails.team}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Status</label>
				<p>{requestDetails.status}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Data Início</label>
				<p>{requestDetails.startDate}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Data Finalizado</label>
				<p>{requestDetails.endDate}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Tempo (h)</label>
				<p>{requestDetails.timeSpent}</p>
			</div>
			<div className="mb-3 col-12">
				<label className="form-label">Materiais</label>
				{requestDetails.materials.map((item, index) => (
					<p key={index}>{item}</p>
				))}
			</div>
			<div className="mb-3 col-12">
				<label className="form-label">Observação</label>
				<p>{requestDetails.observations}</p>
			</div>
		</div>
	);
}
