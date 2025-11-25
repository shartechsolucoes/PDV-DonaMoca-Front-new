import './styles.css';
import { Typography, Box } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

interface CardProps {
	title: string;
	description: string;
	date?: string;
	color?: string; // exemplo: "#ff9800"
}

export default function Card({ title, description, date, color }: CardProps) {
	return (
		<li className="mb-4" style={{ borderLeft: `6px solid ${color}`, marginBottom: 2 }}>
			<div className="card-header">
				<h3>{title}</h3>
			</div>
			<div className="card-body">
				<Box display="flex" alignItems="center" gap={1} mb={1}>
					<NotificationsActiveIcon color="action" />
					<Typography variant="h6" component="div">
						{title}
					</Typography>
				</Box>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
				{date && (
					<Typography variant="caption" color="text.secondary" display="block" mt={1}>
						📅 {new Date(date).toLocaleDateString()}
					</Typography>
				)}
			</div>
		</li>
	);
}
