interface IConfirmProps {
	company: {
		name: string;
		cnpj: string;
		phone: string;
	};
	address: {
		cep: string;
		address: string;
		number: string;
		neighborhood: string;
		city: string;
		state: string;
	};
}

export default function Confirm({ company, address }: IConfirmProps) {
	return (
		<div className="row">
			{/* Dados do solicitante */}
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Nome</label>
				<p>{company.name}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">CNPJ</label>
				<p>{company.cnpj}</p>
			</div>
			<div className="mb-3 col-12 col-md-6">
				<label className="form-label">Telefone/Celular</label>
				<p>{company.phone}</p>
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
		</div>
	);
}
