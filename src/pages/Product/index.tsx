import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../../api";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import "./index.css";

type Type = {
	id: number;
	cod: number;
	name: string;
	type: string;
	value: string;
	createAt: string;
};

export default function Sales() {
	const [products, setProducts] = useState<Type[]>([]);
	const [loading, setLoading] = useState(true);

	// Carrega a lista de Produtos
	const load = async () => {
		try {
			setLoading(true);
			const response = await api.get("/products");
			setProducts(response.data);
		} catch (err) {
			console.error("Erro ao carregar:", err);
			alert("Erro ao carregar");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	// Deletar
	const handleDelete = async (id: number) => {
		if (!window.confirm("Deseja realmente deletar este Produto ?")) return;

		try {
			await api.delete(`/product/${id}`);
			alert("deletada com sucesso!");
			setProducts((prev) => prev.filter((s) => s.id !== id));
		} catch (err) {
			console.error(err);
			alert("Erro ao deletar");
		}
	};

	if (loading)
		return (
			<div className="text-center mt-4">
				<div className="spinner-border text-info" role="status"></div>
				<p>Carregando Produtos...</p>
			</div>
		);

	return (
		<div>
			{/* Cabeçalho da página */}
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">Produtos</h2>
					<p className="url-page">Dashboard / Produtos</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<NavLink
						to="/product/new"
						className="btn btn-info"
						style={{ height: "fit-content" }}
					>
						Adicionar
					</NavLink>
				</div>
			</div>

			{/* Lista de Produtos */}
			<div className="row mt-3">
				{products.length === 0 && (
					<p className="text-center text-muted mt-3">Nenhuma item encontrado.</p>
				)}

				{products.map((product) => (
					<div
						className="col-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 mb-3"
						key={products.id}
					>
						<div className="card h-100 rounded-4 shadow-sm">
							<div className="m-3">
								<h5 className="card-title">{product.name}</h5>
								<p className="card-text text-muted mb-2">
									<b>Codigo:</b> {product.cod}
								</p>
								<p className="card-text">{product.obs || "Sem observações"}</p>

								<div className="d-flex justify-content-between gap-2 mt-3">
									<NavLink
										to={`/product/${product.id}`}
										className="btn btn-sm btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-1"
										title="Editar"
									>
										<LuPencilLine /> Editar
									</NavLink>
									<button
										className="btn btn-sm btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-1"
										title="Deletar"
										onClick={() => handleDelete(product.id)}
									>
										<LuTrash2 /> Excluir
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
