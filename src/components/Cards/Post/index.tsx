import './styles.css';

export default function Card() {
	return (
		<div className="card">
			<div className="card-body">
				<div className="card-image">
					<img src='https://prium.github.io/falcon/v3.25.0/assets/img/generic/13.jpg' className='img-fluid'/>
				</div>
				<div className="card-text d">
					titulo
					Texto
					<div className='d-flex flex-column align-items-justify-between'>
						<div className='d-flex'>
							<img src="https://prium.github.io/falcon/v3.25.0/assets/img/generic/13.jpg" className="avatar"/>
							<p>Edson Rodrigues</p>
						</div>
						<a href='#' className='btn btn-black'>Ver</a>
					</div>

				</div>
			</div>
		</div>
	);
}
