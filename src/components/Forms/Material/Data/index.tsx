interface IMaterialData {
	name: string;
	unit: string;
	type: string;
	observations: string;
	onChange: (
		field: keyof Omit<IMaterialData, 'onChange'>,
		value: string
	) => void;
}

export default function MaterialData({
	name,
	unit,
	type,
	observations,
	onChange,
}: IMaterialData) {
	return (
		<>
			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="material-name" className="form-label">
					Nome
				</label>
				<input
					type="text"
					id="material-name"
					className="form-control"
					value={name}
					required
					onChange={(e) => onChange('name', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="material-unit" className="form-label">
					Unidade
				</label>
				<input
					type="text"
					id="material-unit"
					className="form-control"
					value={unit}
					required
					onChange={(e) => onChange('unit', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="material-type" className="form-label">
					Tipo
				</label>
				<input
					type="text"
					id="material-type"
					className="form-control"
					value={type}
					required
					onChange={(e) => onChange('type', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-12">
				<label htmlFor="material-observations" className="form-label">
					Observações
				</label>
				<textarea
					id="material-observations"
					className="form-control"
					value={observations}
					required
					onChange={(e) => onChange('observations', e.target.value)}
				/>
			</div>
		</>
	);
}
