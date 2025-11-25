import './styles.css';
import {MdOutlineStreetview} from "react-icons/md";

export default function Card() {
	return (
		<div className="card student">
			<div className="card-header">
				<h3>Alunos</h3>
			</div>
			<div className="card-body">
				<ul>
					<li>
						<div className='row'>
							<div className='col-3'>
								<img src="https://img.cdndsgni.com/preview/13061428.jpg" className='img-fluid'/>
							</div>
							<div className='col-8'>
								<p>Carla Dias</p>
								<span>Turma: 3A</span>
							</div>
							<div className='col-1'>
								<MdOutlineStreetview />
							</div>
						</div>
					</li>
					<li>
						<div className='row'>
							<div className='col-3'>
								<img src="https://img.cdndsgni.com/preview/13061428.jpg" className='img-fluid'/>
							</div>
							<div className='col-8'>
								<p>Carla Dias</p>
								<span>Turma: 3A</span>
							</div>
							<div className='col-1'>
								<MdOutlineStreetview />
							</div>
						</div>
					</li>
					<li>
						<div className='row'>
							<div className='col-3'>
								<img src="https://img.cdndsgni.com/preview/13061428.jpg" className='img-fluid'/>
							</div>
							<div className='col-8'>
								<p>Carla Dias</p>
								<span>Turma: 3A</span>
							</div>
							<div className='col-1'>
								<MdOutlineStreetview />
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}
