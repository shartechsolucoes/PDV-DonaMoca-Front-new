import './styles.css';
export default function Spinner() {
	return (
		<div style={{ position: 'relative', display: 'inline-flex' }}>
			<span className="loader"></span>
		</div>
	);
}
