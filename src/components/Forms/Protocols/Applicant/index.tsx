import { InputMask } from '@react-input/mask';

interface IApplicantProps {
	name: string;
	cpf: string;
	phone: string;
	request: string;
	onChange: (field: string, value: string) => void;
}

export default function Applicant({
	name,
	cpf,
	phone,
	request,
	onChange,
}: IApplicantProps) {
	return (
		<>
			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="applicant-name" className="form-label">
					Nome
				</label>
				<input
					type="text"
					id="applicant-name"
					className="form-control"
					value={name}
					required
					onChange={(e) => onChange('name', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="applicant-cpf" className="form-label">
					CPF
				</label>
				<InputMask
					id="applicant-cpf"
					className="form-control"
					mask="___.___.___-__"
					replacement={{ _: /\d/ }}
					value={cpf}
					onChange={(e) => onChange('cpf', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="applicant-phone" className="form-label">
					Telefone/Celular
				</label>
				<InputMask
					id="applicant-phone"
					className="form-control"
					mask="(__)_____-____"
					replacement={{ _: /\d/ }}
					value={phone}
					onChange={(e) => onChange('phone', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-12">
				<label htmlFor="applicant-request" className="form-label">
					Solicitação
				</label>
				<textarea
					id="applicant-request"
					className="form-control"
					required
					value={request}
					onChange={(e) => onChange('request', e.target.value)}
				/>
			</div>
		</>
	);
}
