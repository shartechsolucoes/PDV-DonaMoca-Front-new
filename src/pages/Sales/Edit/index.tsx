import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { api } from "../../../api";
import "./user.css";
import {LuPencilLine, LuTrash2} from "react-icons/lu";
import Thumbnail from "../../../components/Image/thumbnail.tsx";

type SaleType = {
	id: number;
	clienteId: number;
	createAt: string;
	updateAt: string;
	deleteAt: string;
	obs: string;
	paymentMethod: number
	};

type ProductsType = {
	id: number;
	cod: number;
	name: string;
	type: string;
	imageId: number;
	value: string;
	description: string;
	createAt: string;
};

export default function Form() {
	const navigate = useNavigate();
	const [products, setProducts] = useState<ProductsType[]>([]);

	const { id } = useParams<{ id?: string }>();

	const [sale, setSale] = useState<SaleType>({
		id: 0,
		clienteId: 0,
		createAt: "",
		updateAt: "",
		deleteAt: "",
		obs: "",
		paymentMethod:0,
	});

	// Carrega dados se estiver em modo edição
	useEffect(() => {
		if (id) {
			loadSale();
			loadProduct();
		}
	}, [id]);

	const loadSale = async () => {
		try {
			const { data } = await api.get(`/sale/${id}`);
			setSale(data);
		} catch (err) {
			console.error(err);
			alert("Erro ao carregar a venda");
		}
	};
	// Carrega a lista de Produtos
	const loadProduct = async () => {
		try {
			const response = await api.get("/products");
			setProducts(response.data);
		} catch (err) {
			console.error("Erro ao carregar:", err);
			alert("Erro ao carregar");
		}
	};

	const handleChange = (field: keyof SaleType, value: string | number) => {
		setSale((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			const payload = {
				idCliente: sale.clienteId,
				obs: sale.obs,
				paymentMethod: sale.paymentMethod
			};

			if (id) {
				// Atualiza venda existente
				await api.put(`/sale/${id}`, payload);
				alert("Venda atualizada com sucesso!");
			} else {
				// Cria nova venda
				await api.post("/sale", payload);
				alert("Venda criada com sucesso!");
			}

			navigate("/sales");
		} catch (err) {
			console.error(err);
			alert("Erro ao salvar a venda");
		}
	};

	const [qty, setQty] = useState(1);

	const isEdit = Boolean(id);

	const Field = ({
					   label,
					   value,
					   children
				   }: {
		label: string;
		value: any;
		children: React.ReactNode;
	}) => (
		<div className="col-6 mb-3">
			<label className="form-label">{label}</label>

			{isEdit ? (
				<div className="form-control-plaintext">{value || "---"}</div>
			) : (
				children
			)}
		</div>
	);

	return (
		<div className="mt-4">
			{/* Header */}
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">{id ? "Editar Venda" : "Nova Venda"}</h2>
					<p className="url-page">Dashboard / Venda</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<button onClick={handleSave} className="btn btn-info">
						{id ? "Atualizar" : "Salvar"}
					</button>
					<NavLink to="/sales" className="btn btn-secondary">
						Voltar
					</NavLink>
				</div>
			</div>

			{/* Conteúdo principal */}
			<div className="row mt-4">
				<div className="col-8">
					<div className="row">
						<div className="col-12 mb-4">
							<div className="card d-flex justify-content-center">
								<div className="badge">Sucos</div>
								<div className="badge">Refrigerantes</div>
								<div className="badge">Salgados</div>
								<div className="badge">Doces</div>
							</div>
						</div>
						{products.length === 0 && (
							<p className="text-center text-muted mt-3">Nenhuma item encontrado.</p>
						)}

						{products.map((product) => (
							<div
								className="col-4 mb-3"
								key={product.id}
							>
								<div className="card p-3" >
									<div className="d-flex gap-2">
										<Thumbnail image_id={product.imageId} width={140} height={160} />

										<div>
											<h6 className="fw-bold mb-1">{product.name} <span className="text-warning">{product.value}</span></h6>
											{product.cod}
											<p className="text-muted small mb-2">
												{product.description}
											</p>

										</div>
									</div>

									{/* --- Contador --- */}
									<div className="d-flex justify-content-between align-items-center mt-3">
										<div className="d-flex align-items-center gap-2">
											<button
												className="btn btn-outline-secondary btn-sm rounded-circle"
												onClick={() => qty > 1 && setQty(qty - 1)}
											>
												–
											</button>
											<span className="fw-bold">{qty}</span>
											<button
												className="btn btn-outline-secondary btn-sm rounded-circle"
												onClick={() => setQty(qty + 1)}
											>
												+
											</button>
										</div>

										{/* --- Botão "Added to cart" --- */}
										<button className="btn btn-warning px-4 rounded-pill">
											+
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-4">
					<div className="card">
						<div className="card-body">
							<div className="row">
								{/* ---------------- CLIENTE ---------------- */}
								<Field
									label="Cliente"
									value={
										sale.clienteId === 1
											? "Edson"
											: sale.clienteId === 2
												? "Luciano"
												: "---"
									}
								>
									<select
										className="form-select"
										value={sale.clienteId}
										onChange={(e) =>
											handleChange("clienteId", Number(e.target.value))
										}
									>
										<option value={0}>Selecione um cliente</option>
										<option value={1}>Edson</option>
										<option value={2}>Luciano</option>
									</select>
								</Field>

								{/* ---------------- TIPO ---------------- */}
								<Field
									label="Tipo"
									value={
										["---", "Balcão", "Comanda"][sale.paymentMethod] ||
										"---"
									}
								>
									<select
										className="form-select"
										value={sale.paymentMethod}
										onChange={(e) =>
											handleChange("paymentMethod", Number(e.target.value))
										}
									>
										<option value={0}>Tipo de Venda</option>
										<option value={1}>Balcão</option>
										<option value={2}>Comanda</option>
									</select>
								</Field>

								{/* ---------------- STATUS ---------------- */}
								<Field
									label="Status"
									value={
										["---", "Aberto", "Pendente", "Finalizado"][
											sale.clienteId
											] || "---"
									}
								>
									<select
										className="form-select"
										value={sale.clienteId}
										onChange={(e) =>
											handleChange("clienteId", Number(e.target.value))
										}
									>
										<option value={0}>Selecione</option>
										<option value={1}>Aberto</option>
										<option value={2}>Pendente</option>
										<option value={3}>Finalizado</option>
									</select>
								</Field>

								{/* ---------------- FORMA DE PAGAMENTO ---------------- */}
								<Field
									label="Forma de Pagamento"
									value={
										["---", "Pix", "Dinheiro", "Crédito", "Débito", "Fiado"][
											sale.paymentMethod
											] || "---"
									}
								>
									<select
										className="form-select"
										value={sale.paymentMethod}
										onChange={(e) =>
											handleChange("paymentMethod", Number(e.target.value))
										}
									>
										<option value={0}>Selecione</option>
										<option value={1}>Pix</option>
										<option value={2}>Dinheiro</option>
										<option value={3}>Crédito</option>
										<option value={4}>Débito</option>
										<option value={5}>Fiado</option>
									</select>
								</Field>

								{/* ---------------- PARCELAMENTO (somente crédito) ---------------- */}
								{sale.paymentMethod === 3 && (
									<Field
										label="Parcelamento"
										value={
											sale.installments
												? sale.installments + "x"
												: "---"
										}
									>
										<select
											className="form-select"
											value={sale.installments || ""}
											onChange={(e) =>
												handleChange("installments", Number(e.target.value))
											}
										>
											<option value="">Selecione o número de parcelas</option>
											<option value={2}>2x</option>
											<option value={3}>3x</option>
											<option value={4}>4x</option>
										</select>
									</Field>
								)}

								{/* ---------------- OBSERVAÇÕES ---------------- */}
								<div className="col-12 mb-3">
									<label className="form-label">Observações</label>
									{isEdit ? (
										<div className="form-control-plaintext">
											{sale.obs || "---"}
										</div>
									) : (
										<textarea
											className="form-control"
											value={sale.obs}
											onChange={(e) => handleChange("obs", e.target.value)}
											placeholder="Observações da venda..."
										/>
									)}
								</div>
								<div>
									Lista de produtos<br/>
									Nome | Valor |Quantidade<br/>
									Subtotal | valor<br/>
									Taxas | valor<br/>
									Total | valor

								</div>
								<div className="d-flex">
								<button className="btn btn-primary">
									Cancelar
								</button>
								<button className="btn btn-primary">
									Finalizar
								</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
