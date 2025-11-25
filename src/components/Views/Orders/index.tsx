import { useEffect, useRef, useState } from 'react';
import { api } from '../../../api';
import { useSearchParams } from 'react-router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { useReactToPrint } from 'react-to-print';
import Image from '../../Forms/Image/index.tsx';

export default function OrdersView() {
	const [formData, setFormData] = useState<{ [key: string]: any }>({});
	const [listOfKits, setListOfKits] = useState<
		Array<{
			id: number;
			quantity: string;
			description: string;
			materials?: { material: { description: string; quantity: string } }[];
		}>
	>([]);
	const [kits, setKits] = useState<
		Array<{ id: number; quantity: string; description: string }>
	>([]);
	const [kitAndQuantity, setKitAndQuantity] = useState<
		Array<{ kit_id: number; quantity: string }>
	>([]);
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	const getKits = async () => {
		const response = await api.get('kits');
		setKits(response.data);
	};

	const getOrder = async () => {
		const response = await api.get(`/order/${id}`);
		response.data.ordersKits.map((ok: { kit_id: number; quantity: string }) => {
			const kitInfo = kits.filter((kit) => kit.id === ok.kit_id);
			setListOfKits((prev) => [...prev, kitInfo[0]]);
		});
		setKitAndQuantity(response.data.ordersKits);
		setFormData(response.data);
	};

	useEffect(() => {
		if (kits.length === 0) {
			getKits();
		}
		if (id && kits.length !== 0) {
			getOrder();
		}
	}, [kits]);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	const registerDay = formData.registerDay
		? format(formData.registerDay, 'dd/MM/yyyy', { locale: ptBR })
		: '';
	// const registerTime = formData.registerDay
	// 	? format(formData.registerDay, 'hh:mm', { locale: ptBR })
	// 	: '';

	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });
	const today = format(new Date(), 'dd/MM/yyyy');
	return (
		<>
			<div className="d-flex p-2 pt-0 justify-content-end gap-3">
				<button type="button" onClick={() => reactToPrintFn()} className="btn">
					<BsFileEarmarkPdf /> Baixar PDF
				</button>
			</div>
			<div className="card p-3 pb-3 mb-5">
				<div className="card-body" ref={contentRef}>
					<div className="d-flex gap-4 mb-4">
						<img
							alt="logo da prefeitura"
							className="m-4"
							src="/src/assets/prefeitura_logo.png"
							height={70}
							width={50}
						/>
						<span className="flex-fill text-center">
							<h2 className="m-3 mt-5 fw-bolder">
								Ordem de Serviço #{formData.qr_code}
							</h2>
							{<p>Executado em {registerDay}</p>}
						</span>
						<p className="m-4">{today}</p>
					</div>
					<div className="m-3 row">
						<h4 className="">Endereço</h4>
						<hr />
						<div className="col-6 mt-2">
							<strong>Rua:</strong> {formData.address}
						</div>
						<div className="col-6 mt-2">
							<strong>Bairro:</strong> {formData.neighborhood}
						</div>
						<div className="col-6 mt-2">
							<strong>Município:</strong> {formData.city}
						</div>
						<div className="col-6 mt-2">
							<strong>UF:</strong> {formData.state}
						</div>
						<div className="col-md-6 mt-2">
							<strong>Latitude:</strong> {formData.lat}
						</div>
						<div className="col-6 mt-2">
							<strong>Longitude:</strong> {formData.long}
						</div>

						<h4 className="mt-4">Obs:</h4>
						<hr />
						<div className="mb-3">{formData.observations}</div>

						<h4 className="mt-4">Fotos</h4>
						<hr />
						<div className="mb-3 d-flex gap-4 justify-content-center">
							<span className="d-flex flex-column fw-bold align-items-center">
								{formData.photoStartWork && (
									<>
										<label className="mb-3">Inicio</label>
										<Image
											image={formData.photoStartWork}
											height="240px"
											orientation="from-image"
										/>
									</>
								)}
							</span>
							<span className="d-flex flex-column fw-bold align-items-center">
								{formData.photoEndWork && (
									<>
										<label className="mb-3">Fim</label>
										<Image
											image={formData.photoEndWork}
											height="240px"
											orientation="from-image"
										/>
									</>
								)}
							</span>
						</div>

						<h4 className="mt-4">Kit(s)</h4>
						<hr />
						<table className="mt-2">
							<tr>
								<th>Descrição</th>
								<th>Materiais</th>
								<th className="text-center">Quantidade</th>
							</tr>

							{listOfKits.length > 0 && (
								<>
									{listOfKits.map((kit) => (
										<tr>
											<td>{kit.description}</td>
											<td>
												{kit?.materials?.map((material) => (
													<div className="ms-3 my-2">
														({material.material.quantity}){' '}
														{material.material.description}
													</div>
												))}
											</td>
											<td className="text-center">
												{kitAndQuantity.some((kq) => kq.kit_id === kit.id)
													? kitAndQuantity.filter((k) => k.kit_id === kit.id)[0]
															.quantity
													: ''}
											</td>
										</tr>
									))}
								</>
							)}
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
