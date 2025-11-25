import { StepProgress } from '../../StepProgress';
import { useState } from 'react';
import Confirm from './Confirm';
import MaterialData from './Data';

const stepList = ['Dados', 'Confirmação'];
export default function MaterialForm() {
	const [steps, setStep] = useState(1);

	const [materialData, setMaterialData] = useState({
		name: '',
		unit: '',
		type: '',
		observations: '',
	});

	const handleMaterialChange = (field: string, value: string) => {
		setMaterialData((prev) => ({ ...prev, [field]: value }));
	};

	const stepRender = () => {
		switch (steps) {
			case 2:
				return (
					<Confirm
						data={{
							name: materialData.name,
							observations: materialData.observations,
							type: materialData.type,
							unit: materialData.unit,
						}}
					/>
				);

			default:
				return (
					<MaterialData
						name={materialData.name}
						unit={materialData.unit}
						type={materialData.type}
						observations={materialData.observations}
						onChange={handleMaterialChange}
					/>
				);
		}
	};

	return (
		<>
			<div className="header-page row">
				<div className="col-4">
					<h2 className="title-page">Criar Material</h2>
					<p className="url-page">Dashboard / Material</p>
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
								onClick={() => console.log(materialData)}
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
