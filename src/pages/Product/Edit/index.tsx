import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { api } from "../../../api";
import "./user.css";

type Type = {
	id: number;
	cod: number;
	name: string;
	type: number;
	value: string;
	description: string;
	obs: string;
	cost: string;
	status: number;
};

export default function Form() {
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();

	const [product, setProduct] = useState<Type>({
		id: 0,
		cod: 0,
		name: "",
		type: 0,
		value: "",
		description: "",
		obs: "",
		cost: "",
		status: 0
	});

	// Carrega dados se estiver em modo edição
	useEffect(() => {
		if (id) {
			loadProduct();
		}
	}, [id]);

	const loadProduct = async () => {
		try {
			const { data } = await api.get(`/product/${id}`);
			setProduct(data);
		} catch (err) {
			console.error(err);
			alert("Erro ao carregar");
		}
	};

	const handleChange = (field: keyof Type, value: string | number) => {
		setProduct((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			if (id) {
				await api.put(`/product/${id}`, product);
				alert("Atualizada com sucesso!");
				navigate(`/product/${id}`);
			} else {
				await api.post("/product", product);
				alert("Produto criado com sucesso!");
				navigate(`/products`);
			}

		} catch (err) {
			console.error(err);
			alert("Erro ao salvar");
		}
	};

	return (
		<div className="mt-4">
			{/* Header */}
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">{id ? "Editar Produto" : "Novo Produto"}</h2>
					<p className="url-page">Dashboard / Produto</p>
				</div>

				<div className="col-9 d-flex justify-content-end gap-2">
					<button onClick={handleSave} className="btn btn-info">
						Salvar
					</button>

					<NavLink to="/products" className="btn btn-secondary">
						Voltar
					</NavLink>
				</div>
			</div>

			{/* Conteúdo principal */}
			<div className="row mt-4">
				<div className="col-12">
					<div className="card user">
						<div className="card-body">
							<div className="row">

								<h5 className="mb-3">Atividades do Produto</h5>
                                 <div className="col-6 mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={product.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        required
                                    />
								</div>
								{/* Cliente / Código */}
								<div className="col-6 mb-3">
									<label className="form-label">Código</label>
									<input
                                        type="text"
                                        className="form-control"
                                        value={product.cod}
                                        onChange={(e) => handleChange("cod", Number (e.target.value))}
                                        required
                                    />
								</div>

								{/* Tipo */}
								<div className="col-6 mb-3">
									<label className="form-label">Tipo</label>
									<select
										className="form-select"
										value={product.type}
										onChange={(e) =>
											handleChange("type", Number(e.target.value))
										}
									>
										<option value={0}>Tipos de Produtos</option>
										<option value={1}>Refrigerantes</option>
										<option value={2}>Salgados</option>
									</select>
								</div>

								{/* Status */}
								<div className="col-2 mb-3">
									<label className="form-label">Status</label>
									<select
										className="form-select"
										value={product.status}
										onChange={(e) =>
											handleChange("status", Number(e.target.value))
										}
									>
										<option value={0}>Selecione</option>
										<option value={1}>Ativo</option>
										<option value={2}>Inativo</option>
									</select>
								</div>

								{/* Observações */}
								<div className="col-12 mb-3">
									<label className="form-label">Descrição</label>
									<textarea
										className="form-control"
										value={product.obs}
										onChange={(e) => handleChange("obs", e.target.value)}
										placeholder="Descrição / observações do produto..."
									/>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
