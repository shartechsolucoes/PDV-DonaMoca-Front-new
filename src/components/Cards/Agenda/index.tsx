import './styles.css';

export default function Card() {
	return (
		<div className="card agenda">
			<div className="card-header">
				<h3>Julho 2025</h3>
			</div>
			<div className="card-body">
				<table>
					<thead>
						<th>D</th>
						<th className="active">S</th>
						<th>T</th>
						<th>Q</th>
						<th>Q</th>
						<th>S</th>
						<th>S</th>
					</thead>
					<tbody>
						<td>22</td>
						<td className="active">23</td>
						<td>24</td>
						<td>25</td>
						<td>26</td>
						<td>27</td>
						<td>28</td>
					</tbody>
				</table>

				<ul>
					<li>
						<h4>Reunião Pedagógica - Ana Silva</h4>
						<span>25/06/2025 às 16:00</span>
					</li>
					<li>
						<h4>Visita Fonoaudióloga - Bruno Costa</h4>
						<span>27/06/2025 às 16:00</span>
					</li>
					<li>
						<h4>Reunião de Acompanhamento - Carla Dias</h4>
						<span>02/08/2025 às 16:00</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
