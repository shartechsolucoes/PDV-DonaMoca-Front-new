import Address from '../Addsress';
import Request from './Request';
import Applicant from './Applicant';
import { StepProgress } from '../../StepProgress';
import { useState } from 'react';
import Confirm from './Confirm';

const stepList = ['Endereço', 'Solicitante', 'Execução', 'Confirmação'];
export default function ProtocolForm() {
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

	const [applicantData, setApplicantData] = useState({
		name: '',
		cpf: '',
		phone: '',
		request: '',
	});

	const handleApplicantChange = (field: string, value: string) => {
		setApplicantData((prev) => ({ ...prev, [field]: value }));
	};

	const [requestData, setRequestData] = useState({
		serviceType: '',
		team: '',
		status: '',
		materials: '',
		observations: '',
	});

	const handleRequestChange = (field: string, value: string) => {
		setRequestData((prev) => ({ ...prev, [field]: value }));
	};

	const stepRender = () => {
		switch (steps) {
			case 2:
				return (
					<Applicant
						name={applicantData.name}
						cpf={applicantData.cpf}
						phone={applicantData.phone}
						request={applicantData.request}
						onChange={handleApplicantChange}
					/>
				);
			case 3:
				return (
					<Request
						serviceType={requestData.serviceType}
						team={requestData.team}
						status={requestData.status}
						materials={requestData.materials}
						observations={requestData.observations}
						onChange={handleRequestChange}
					/>
				);
			case 4:
				return (
					<Confirm
						applicant={{
							name: applicantData.name,
							cpf: applicantData.cpf,
							phone: applicantData.phone,
							request: applicantData.request,
						}}
						address={{
							cep: addressData.cep,
							address: addressData.address,
							number: addressData.number,
							neighborhood: addressData.neighborhood,
							city: addressData.city,
							state: addressData.state,
						}}
						requestDetails={{
							serviceType: requestData.serviceType,
							team: requestData.team,
							status: requestData.status,
							startDate: '01/02/25',
							endDate: '02/02/25',
							timeSpent: '20h',
							materials: [
								'Material 1 - 10und',
								'Material 2 - 10und',
								'Material 3 - 10und',
							],
							observations: requestData.observations,
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
					<h2 className="title-page">Criar Protocolo</h2>
					<p className="url-page">Dashboard / Protocolo</p>
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
