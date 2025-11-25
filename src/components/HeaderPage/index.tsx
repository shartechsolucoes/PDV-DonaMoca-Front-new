import './styles.css';

interface CardProps {
	title: string;
	footer: string;
	content: string | number;
	info: string | number;
}

export default function Card({ title, content, footer, info }: CardProps) {
	return (
		<div className="card basic">
			<div className="card-header">
				<h3>{title}</h3>
			</div>
			<div className="card-body">
				<h3 className='value'>{content}</h3>
				<span>{info}</span>
			</div>
			<div className="card-footer">
				<p>{footer}</p>
			</div>
		</div>
	);
}
