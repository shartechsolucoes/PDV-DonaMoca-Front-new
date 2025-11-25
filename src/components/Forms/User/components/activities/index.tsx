import { useEffect, useState } from 'react';
import { api } from '../../../../../api';
import { Link, useSearchParams } from 'react-router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Activities() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');
	const [activities, setActivities] = useState([]);
	const [count, setCount] = useState([]);

	const getActivities = async () => {
		const response = await api.get('/user/activities', { params: { id } });
		setActivities(response.data.activities);
		setCount(response.data.count);
	};

	useEffect(() => {
		getActivities();
	}, []);
	return (
		<div className="card mb-6  ">
			<h5 className="card-header d-flex justify-content-between">
				Atividade <span>Total: {count}</span>
			</h5>

			<div className="card-body pt-1">
				<ul className="timeline mb-0">
					{activities.map((actv: any) => (
						<li className="timeline-item timeline-item-transparent">
							<span className="timeline-point timeline-point-primary"></span>

							<div className="timeline-event">
								<div className="timeline-header mb-3">
									<h6 className="mb-0">OS N°{actv.qr_code}</h6>
									<small className="text-body-secondary">
										{actv.registerDay
											? format(actv.registerDay, 'dd/MM/yy HH:mm', {
													locale: ptBR,
											  })
											: ''}
									</small>
								</div>
								<p className="mb-2">
									{actv.address}, {actv.neighborhood} {actv.city}/{actv.state}
								</p>
								<div className="d-flex align-items-center my-3">
									<div className="badge bg-lighter rounded d-flex align-items-center">
										<Link
											to={`/orders/view?id=${actv.id}`}
											className="mb-0 text-body"
										>
											Visualizar
										</Link>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

// active
// :
// true
// address
// :
// "Ibiporã n.º:  PX83+2J"
// city
// :
// "BR"
// duplicated
// :
// false
// id
// :
// 47
// lat
// :
// "-23.2849408"
// long
// :
// "-51.0459904"
// neighborhood
// :
// "PR"
// observations
// :
// ""
// photoEndWork
// :
// "/images/endWork/prefeitura_logo.webp"
// photoStartWork
// :
// "/images/startWork/link-avatar.webp"
// protocolNumber
// :
// ""
// qr_code
// :
// 333465
// registerDay
// :
// "2025-04-14T20:22:02.564Z"
// state
// :
// "AM"
// status
// :
// 2
// userId
// :
// "02e0fb15-9291-4952-a5d4-31f7e2cb5f35"
