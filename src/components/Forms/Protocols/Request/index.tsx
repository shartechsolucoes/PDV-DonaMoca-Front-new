interface IRequestProps {
	serviceType: string;
	team: string;
	status: string;
	materials: string;
	observations: string;
	onChange: (field: string, value: string) => void;
}

export default function Request({
	serviceType,
	team,
	status,
	materials,
	observations,
	onChange,
}: IRequestProps) {
	return (
		<>
			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="serviceType" className="form-label">
					Tipo de serviço
				</label>
				<input
					type="text"
					id="serviceType"
					className="form-control"
					value={serviceType}
					required
					onChange={(e) => onChange('serviceType', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="team" className="form-label">
					Equipe
				</label>
				<input
					type="text"
					id="team"
					className="form-control"
					value={team}
					required
					onChange={(e) => onChange('team', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="status" className="form-label">
					Status
				</label>
				<input
					type="text"
					id="status"
					className="form-control"
					value={status}
					required
					onChange={(e) => onChange('status', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-6">
				<label htmlFor="materials" className="form-label">
					Materiais
				</label>
				<input
					type="text"
					id="materials"
					className="form-control"
					value={materials}
					required
					onChange={(e) => onChange('materials', e.target.value)}
				/>
			</div>

			<div className="mb-3 col-12 col-md-12">
				<label htmlFor="observations" className="form-label">
					Observações
				</label>
				<textarea
					id="observations"
					className="form-control"
					value={observations}
					required
					onChange={(e) => onChange('observations', e.target.value)}
				/>
			</div>
		</>
	);
}
