export default function Image({
	image,
	height,
	orientation,
}: {
	image: string;
	height?: string;
	orientation?: 'none' | 'from-image';
}) {
	return (
		<img
			key={image}
			className="img-fluid rounded"
			style={{
				// maxHeight: height,
				// maxWidth: '162px',
				width: 'auto',
				height: height,
				objectFit: 'inherit',
				imageOrientation: orientation,
			}}
			src={`${import.meta.env.VITE_API_URL}${image}?t=${Date.now()}`}
			// height="120"
			// width="120"
			alt={image}
		/>
	);
}
