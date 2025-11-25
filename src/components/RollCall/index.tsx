import React, { useState } from 'react';
import { RegistroChamada } from './types';

type Props = {
	historico: RegistroChamada[];
};

const RollCall: React.FC<Props> = ({ historico }) => {
	const [dataInicio, setDataInicio] = useState('2025-06-01');
	const [dataFim, setDataFim] = useState('2025-07-04');

	const registrosFiltrados = historico.filter((r) => {
		const dataRegistro = new Date(r.data).getTime();
		return (
			dataRegistro >= new Date(dataInicio).getTime() &&
			dataRegistro <= new Date(dataFim).getTime()
		);
	});

	const datasUnicas = Array.from(
		new Set(registrosFiltrados.map((r) => r.data))
	).sort();

	const alunosUnicos = Array.from(
		new Map(registrosFiltrados.map((r) => [r.alunoId, r.alunoNome])).entries()
	);

	const getStatus = (alunoId: number, data: string): string => {
		const registro = registrosFiltrados.find(
			(r) => r.alunoId === alunoId && r.data === data
		);
		if (!registro) return '';
		switch (registro.status) {
			case 'presente':
				return '✅';
			case 'falta':
				return '❌';
			case 'justificada':
				return '🟠';
			default:
				return '';
		}
	};

	return (
		<div style={{ padding: '1rem' }}>

			<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
				<div>
					<label>Data Início: </label>
					<input
						type="date"
						value={dataInicio}
						onChange={(e) => setDataInicio(e.target.value)}
					/>
				</div>
				<div>
					<label>Data Fim: </label>
					<input
						type="date"
						value={dataFim}
						onChange={(e) => setDataFim(e.target.value)}
					/>
				</div>
			</div>

			{datasUnicas.length === 0 ? (
				<p>Nenhum registro encontrado no período.</p>
			) : (
				<table style={{ borderCollapse: 'collapse', width: '100%' }}>
					<thead>
					<tr>
						{datasUnicas.map((data) => (
							<th key={data} style={{ border: '1px solid #ccc', padding: '8px' }}>
								{new Date(data).toLocaleDateString()}
							</th>
						))}
					</tr>
					</thead>
					<tbody>
					{alunosUnicos.map(([id]) => (
						<tr key={id}>
							{datasUnicas.map((data) => (
								<td
									key={data}
									style={{
										border: '1px solid #ccc',
										padding: '0px',
										textAlign: 'center',
									}}
								>
									{getStatus(Number(id), data)}
								</td>
							))}
						</tr>
					))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default RollCall;
