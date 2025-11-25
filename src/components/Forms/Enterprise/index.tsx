import Address from '../Addsress';
import { StepProgress } from '../../StepProgress';
import { useState } from 'react';
import Confirm from './Confirm';
import CompanyData from './Data';

const stepList = ['Endereço', 'Dados', 'Confirmação'];
export default function CompanyForm() {
	const [steps, setStep] = useState(1);

	const [addressData, setAddressData] = useState({
		cep: '',
		address: '',
		number: '',
		neighborhood: '',
		city: '',
		state: '',
	});

	const handleChange = (field: string, value: string) => {
		setAddressData((prev) => ({ ...prev, [field]: value }));
	};

	const [companyData, setCompanyData] = useState({
		name: '',
		cnpj: '',
		phone: '',
		request: '',
	});

	const handleCompanyChange = (field: string, value: string) => {
		setCompanyData((prev) => ({ ...prev, [field]: value }));
	};

	const stepRender = () => {
		switch (steps) {
			case 2:
				return (
					<CompanyData
						name={companyData.name}
						cnpj={companyData.cnpj}
						phone={companyData.phone}
						onChange={handleCompanyChange}
					/>
				);
			case 3:
				return (
					<Confirm
						company={{
							name: companyData.name,
							cnpj: companyData.cnpj,
							phone: companyData.phone,
						}}
						address={{
							cep: addressData.cep,
							address: addressData.address,
							number: addressData.number,
							neighborhood: addressData.neighborhood,
							city: addressData.city,
							state: addressData.state,
						}}
					/>
				);

			default:
				return (
					<Address
						cep={addressData.cep}
						address={addressData.address}
						number={addressData.number}
						neighborhood={addressData.neighborhood}
						city={addressData.city}
						state={addressData.state}
						onChange={handleChange}
					/>
				);
		}
	};

	return (
		<>
			<div className="header-page row">
				<div className="col-4">
					<h2 className="title-page">Criar Empresa</h2>
					<p className="url-page">Dashboard / Empresa</p>
				</div>
				<div className="col-9 d-flex justify-content-end"></div>
			</div>
			<div className="col-12">
				<div className="card">
					<div className="card-body">
						<StepProgress currentStep={steps} steps={stepList} />
						<form className="row">{stepRender()}</form>

						<button
							type="button"
							className="btn btn-light"
							disabled={steps <= 1}
							onClick={() => setStep(steps - 1)}
						>
							Voltar
						</button>
						{steps === stepList.length ? (
							<button
								type="button"
								className="btn btn-success"
								onClick={() => console.log(addressData)}
							>
								Enviar
							</button>
						) : (
							<button
								type="button"
								className="btn btn-primary"
								disabled={steps === stepList.length}
								onClick={() => setStep(steps + 1)}
							>
								Proximo
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
