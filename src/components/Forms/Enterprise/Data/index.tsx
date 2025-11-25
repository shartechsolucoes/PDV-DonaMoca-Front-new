import { InputMask } from '@react-input/mask';

interface ICompanyDataProps {
	name: string;
	cnpj: string;
	phone: string;
	onChange: (
		field: keyof Omit<ICompanyDataProps, 'onChange'>,
		value: string
	) => void;
}

export default function CompanyData({
	name,
	cnpj,
	phone,
	onChange,
}: ICompanyDataProps) {
	return (
		<>
			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="company-name" className="form-label">
					Nome da Empresa
				</label>
				<input
					type="text"
					id="company-name"
					className="form-control"
					value={name}
					required
					onChange={(e) => onChange('name', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="company-cnpj" className="form-label">
					CNPJ
				</label>
				<InputMask
					id="company-cnpj"
					className="form-control"
					value={cnpj}
					mask="__.___.___/____-__"
					replacement={{ _: /\d/ }}
					onChange={(e) => onChange('cnpj', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="company-phone" className="form-label">
					Telefone
				</label>
				<InputMask
					id="company-phone"
					className="form-control"
					mask="(__)_____-____"
					replacement={{ _: /\d/ }}
					value={phone}
					onChange={(e) => onChange('phone', e.target.value)}
				/>
			</div>
		</>
	);
}
