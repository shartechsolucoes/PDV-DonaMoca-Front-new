import './styles.css';
export default function Status({ statusOS }: { statusOS?: number }) {
	if (statusOS == 0) {
		return (
			<>
				<span className="badge bg-label-success text-capitalized">
					{' '}
					Aberto{' '}
				</span>
			</>
		);
	} else if (statusOS == 1) {
		return (
			<>
				<span className="badge bg-label-warning" text-capitalized="">
					Em trabalho
				</span>
			</>
		);
	} else if (statusOS == 2) {
		return (
			<>
				<span className="badge bg-label-info" text-capitalized="">
					Finalizado
				</span>
			</>
		);
	} else {
		return (
			<>
				<span className="badge bg-label-success text-capitalized">
					{' '}
					Aberto{' '}
				</span>
			</>
		);
	}
}
