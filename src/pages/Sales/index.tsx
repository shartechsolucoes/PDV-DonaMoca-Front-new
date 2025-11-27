import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../../api";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import "./index.css";

type SaleType = {
	id: number;
	clienteId: number;
	createAt: string;
	updateAt: string;
	deleteAt: string;
	obs: string;
};

export default function Sales() {
	const [sales, setSales] = useState<SaleType[]>([]);
	const [loading, setLoading] = useState(true);

	// Carrega a lista de vendas
	const load = async () => {
		try {
			setLoading(true);
			const response = await api.get("/sales");
			setSales(response.data);
		} catch (err) {
			console.error("Erro ao carregar Vendas:", err);
			alert("Erro ao carregar vendas");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	// Deletar venda
	const handleDelete = async (id: number) => {
		if (!window.confirm("Deseja realmente deletar esta venda?")) return;

		try {
			await api.delete(`/sale/${id}`);
			alert("Venda deletada com sucesso!");
			setSales((prev) => prev.filter((s) => s.id !== id));
		} catch (err) {
			console.error(err);
			alert("Erro ao deletar venda");
		}
	};

	if (loading)
		return (
			<div className="text-center mt-4">
				<div className="spinner-border text-info" role="status"></div>
				<p>Carregando Vendas...</p>
			</div>
		);

	return (
		<div>
			{/* Cabeçalho da página */}
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">Vendas</h2>
					<p className="url-page">Dashboard / Vendas</p>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<NavLink
						to="/sale/new"
						className="btn btn-info"
						style={{ height: "fit-content" }}
					>
						Adicionar
					</NavLink>
				</div>
			</div>

			<div className="row">
				<div className="col-3">
					<div className="card">
						<div className="card-body">
							Total de vendas
						</div>
					</div>
				</div>
			</div>

			{/* Lista de vendas */}
			<div className="row mt-1">
				{sales.length === 0 && (
					<p className="text-center text-muted mt-3">Nenhuma venda encontrada.</p>
				)}

				{sales.map((sale) => (
					<div
						className="col-12 mb-1"
						key={sale.id}
					>
						<NavLink
							to={`/sale/${sale.id}`}
							className="text-decoration-none"
							title="Editar"
						>

						<div className="card h-100 rounded-4">
							<div className="m-1 d-flex align-items-center justify-content-between">
								<div>
									<h5 className="card-title">#{sale.id}</h5>
									<p className="card-text text-muted mb-2">
										<b>Cliente</b> {sale.clienteId}
									</p>
								</div>
								<div>
									<h5 className="card-title">Tipo de Venda</h5>
									{sale.status}
								</div>
								<div>
									<h5 className="card-title">Valor</h5>
								</div>
								<div>
									<h5 className="card-title">Produtos</h5>

								</div>
								<div>
									<h5 className="card-title">Status</h5>
									{sale.status}
								</div>
								<div className="d-flex justify-content-between gap-2 mt-3">
									{/*<NavLink*/}
									{/*	to={`/sale/${sale.id}`}*/}
									{/*	className="btn btn-sm btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-1"*/}
									{/*	title="Editar"*/}
									{/*>*/}
									{/*	<LuPencilLine /> Editar*/}
									{/*</NavLink>*/}
									{/*<button*/}
									{/*	className="btn btn-sm btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-1"*/}
									{/*	title="Deletar"*/}
									{/*	onClick={() => handleDelete(sale.id)}*/}
									{/*>*/}
									{/*	<LuTrash2 /> Excluir*/}
									{/*</button>*/}
								</div>
							</div>
							<div>
								<p className="card-text">{sale.obs || "Sem observações"}</p>
							</div>
						</div>
						</NavLink>
					</div>
				))}
			</div>
		</div>
	);
}
