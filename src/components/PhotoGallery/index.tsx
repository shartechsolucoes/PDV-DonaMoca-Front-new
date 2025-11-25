import React from 'react';
import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box
} from '@mui/material';

type Student = {
	id: number;
	name: string;
	className: string;
	photoUrl: string;
};

type Props = {
	students: Student[];
};

const PhotoGallery: React.FC<Props> = ({ students }) => {
	return (
		<Box p={2}>
			<Grid container spacing={2}>
				{students.map((student) => (
					<Grid key={student.id}>
						<Card>
							<CardMedia
								component="img"
								height="180"
								image={student.photoUrl}
								alt={student.name}
							/>
							<CardContent>
								<Typography variant="h6">{student.name}</Typography>
								<Typography color="text.secondary">{student.className}</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default PhotoGallery;
