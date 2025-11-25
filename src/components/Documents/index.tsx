import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './index.css';
import { Grid, TextField, FormControlLabel, Checkbox } from '@mui/material';

type PeiReport = {
	id: number;
	diagnosis: string;
	goals: string;
	strategies: string;
	evaluation: string;
	familyParticipation: string;
	date: string;
	signatureResponsavel?: string;
	signatureProfessor?: string;
	signaturePsicologo?: string;
	signatureCoordenador?: string;
};

const initialReports: PeiReport[] = [
	{
		id: 1,
		diagnosis: 'TEA - Transtorno do Espectro Autista',
		goals: 'Melhorar comunicação e socialização',
		strategies: 'Atividades com apoio visual.',
		evaluation: 'Boa evolução.',
		familyParticipation: 'Participação ativa da família.',
		date: '2025-06-20',
	},
	{
		id:2,
		diagnosis: 'TEA - Transtorno do Espectro Autista',
		goals: 'Melhorar comunicação e socialização',
		strategies: 'Atividades com apoio visual.',
		evaluation: 'Boa evolução.',
		familyParticipation: 'Participação ativa da família.',
		date: '2025-06-20',
	},
];

const PeiReportsWithMultiSignature: React.FC = () => {
	const [reports, setReports] = useState<PeiReport[]>(initialReports);
	const [editingReport, setEditingReport] = useState<PeiReport | null>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const signatureRefs = {
		responsavel: useRef<SignatureCanvas>(null),
		professor: useRef<SignatureCanvas>(null),
		psicologo: useRef<SignatureCanvas>(null),
		coordenador: useRef<SignatureCanvas>(null),
	};

	const openEditModal = (report: PeiReport) => {
		setEditingReport({ ...report });
		dialogRef.current?.showModal();
	};

	const closeModal = () => {
		dialogRef.current?.close();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (!editingReport) return;
		setEditingReport({
			...editingReport,
			[e.target.name]: e.target.value,
		});
	};

	const handleSave = () => {
		if (!editingReport) return;

		const updatedReport = { ...editingReport };

		(Object.keys(signatureRefs) as Array<keyof typeof signatureRefs>).forEach((key) => {
			const canvas = signatureRefs[key].current;
			if (canvas && !canvas.isEmpty()) {
				const base64 = canvas.getTrimmedCanvas().toDataURL('image/png');
				const signatureField = `signature${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof PeiReport;
				// @ts-ignore
				updatedReport[signatureField] = base64;
			}
		});

		setReports((prev) =>
			prev.map((r) => (r.id === updatedReport.id ? updatedReport : r))
		);
		closeModal();
	};

	const clearSignature = (role: keyof typeof signatureRefs) => {
		signatureRefs[role].current?.clear();
	};

	const isSigned = (field?: string) => Boolean(field && field.startsWith('data:image'));

	return (
		<div style={{ padding: 20 }}>
			{reports.map((report) => (
				<div
					key={report.id}
					style={{
						border: '1px solid #ccc',
						borderRadius: '10px',
						padding: '16px',
						marginBottom: '20px',
					}}
				>
					<Grid container justifyContent="space-between" alignItems="center">
						<Grid>
							<h3></h3>
							<p><strong>Data:</strong> {new Date(report.date).toLocaleDateString()}</p>
							<p><strong>Diagnóstico:</strong> {report.diagnosis}</p>
							<p><strong>Objetivos:</strong> {report.goals}</p>
							<p><strong>Estratégias:</strong> {report.strategies}</p>
							<p><strong>Avaliação:</strong> {report.evaluation}</p>
							<p><strong>Família:</strong> {report.familyParticipation}</p>

							<Grid container spacing={1} mt={1}>
								{[
									['Responsável', report.signatureResponsavel],
									['Professor', report.signatureProfessor],
									['Psicólogo', report.signaturePsicologo],
									['Coordenador', report.signatureCoordenador],
								].map(([label, signature]) => (
									<Grid key={label}>
										<FormControlLabel
											control={<Checkbox checked={isSigned(signature)} disabled />}
											label={label}
										/>
									</Grid>
								))}
							</Grid>

							<button onClick={() => openEditModal(report)} style={{ marginTop: 10 }}>
								Editar / Assinar
							</button>
						</Grid>
					</Grid>
				</div>
			))}

			{/* Modal */}
			<dialog ref={dialogRef} className="modal-pei">
				<h3>Editar Relatório de PEI</h3>
				{editingReport && (
					<form onSubmit={(e) => e.preventDefault()}>
						<TextField label="Diagnóstico" name="diagnosis" value={editingReport.diagnosis} onChange={handleChange} fullWidth margin="normal" />
						<TextField label="Objetivos" name="goals" value={editingReport.goals} onChange={handleChange} fullWidth margin="normal" />
						<TextField label="Estratégias" name="strategies" value={editingReport.strategies} onChange={handleChange} fullWidth margin="normal" />
						<TextField label="Avaliação" name="evaluation" value={editingReport.evaluation} onChange={handleChange} fullWidth margin="normal" />
						<TextField label="Participação da Família" name="familyParticipation" value={editingReport.familyParticipation} onChange={handleChange} fullWidth margin="normal" />

						{(['responsavel', 'professor', 'psicologo', 'coordenador'] as const).map((role) => (
							<div key={role} style={{ marginTop: 20 }}>
								<label><strong>Assinatura do {role.charAt(0).toUpperCase() + role.slice(1)}:</strong></label>
								<div style={{ border: '1px solid #ccc', marginBottom: 8 }}>
									<SignatureCanvas
										ref={signatureRefs[role]}
										penColor="black"
										canvasProps={{
											width: 500,
											height: 120,
											className: 'signature-canvas',
										}}
									/>
								</div>
								<button type="button" onClick={() => clearSignature(role)}>Limpar</button>
							</div>
						))}

						<div style={{ marginTop: 16 }}>
							<button type="button" onClick={handleSave} style={{ marginRight: 10 }}>
								Salvar
							</button>
							<button type="button" onClick={closeModal}>Cancelar</button>
						</div>
					</form>
				)}
			</dialog>
		</div>
	);
};

export default PeiReportsWithMultiSignature;
