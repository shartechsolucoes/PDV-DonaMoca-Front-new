import { InputMask } from '@react-input/mask';
import styles from './styles.module.css';

interface IAddressData {
	cep: string;
	address: string;
	number: string;
	neighborhood: string;
	city: string;
	state: string;
	onChange: (field: string, value: string) => void;
}

export default function Address({
	cep,
	address,
	number,
	neighborhood,
	city,
	state,
	onChange,
}: IAddressData) {
	return (
		<>
			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="cep" className="form-label">
					CEP
				</label>
				<InputMask
					id="cep"
					className={`${styles.customInput} form-control`}
					mask="_____-___"
					replacement={{ _: /\d/ }}
					value={cep}
					onChange={(e) => onChange('cep', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="address" className="form-label">
					Endereço
				</label>
				<input
					type="text"
					id="address"
					className={`${styles.customInput} form-control`}
					value={address}
					required
					onChange={(e) => onChange('address', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="number" className="form-label">
					Número
				</label>
				<InputMask
					id="number"
					className={`${styles.customInput} form-control`}
					mask="_____"
					replacement={{ _: /\d/ }}
					value={number}
					onChange={(e) => onChange('number', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="neighborhood" className="form-label">
					Bairro
				</label>
				<input
					type="text"
					id="neighborhood"
					className={`${styles.customInput} form-control`}
					value={neighborhood}
					required
					onChange={(e) => onChange('neighborhood', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="city" className="form-label">
					Cidade
				</label>
				<input
					type="text"
					id="city"
					className={`${styles.customInput} form-control`}
					value={city}
					required
					onChange={(e) => onChange('city', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="state" className="form-label">
					Estado
				</label>
				<input
					type="text"
					id="state"
					className={`${styles.customInput} form-control`}
					value={state}
					required
					onChange={(e) => onChange('state', e.target.value)}
				/>
			</div>
		</>
	);
}
