import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { api } from "../../../api";
import "./user.css";

type SaleType = {
	id: number;
	clienteId: number;
	createAt: string;
	updateAt: string;
	deleteAt: string;
	obs: string;
	paymentMethod: number
	};

export default function Form() {
	const navigate = useNavigate();
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
				<div className="col-12">
					<div className="card user">
						<div className="card-body">
							<div className="row" >
							<h5 className="mb-3">Atividades da venda</h5>

							{/* Cliente */}
								<div className="col-6 mb-3">
								<label className="form-label">Cliente</label>
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
							</div>
							<div className="col-6 mb-3">
                            <label className="form-label">Tipo</label>
                            <select
                                className="form-select"
                                value={sale.clienteId}
                                onChange={(e) =>
                                    handleChange("clienteId", Number(e.target.value))
                                }
                            >
                                <option value={0}>Tipo de Venda</option>
                                <option value={1}>Balcão</option>
                                <option value={2}>Comanda</option>
                            </select>
                        </div>
                        <div className="col-2 mb-3">
                            <label className="form-label">Status</label>
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
                        </div>
							{/* Forma de Pagamento*/}
                                <div className="col-4 mb-3">
                                    <label className="form-label">Forma de Pagamento</label>
                                    <select
                                        className="form-select"
                                        value={sale.paymentMethod}
                                        onChange={(e) =>
                                            handleChange("paymentMethod", Number(e.target.value))
                                        }
                                    >
                                        <option value={0}>Selecione um cliente</option>
                                        <option value={1}>Pix</option>
                                        <option value={2}>Dinheiro</option>
                                        <option value={3}>Credito</option>
                                        <option value={4}>Debito</option>
                                        <option value={5}>Fiado</option>
                                    </select>
                                </div>

    {/* Parcelamento (só aparece se for crédito) */}
    {sale.paymentMethod === 3 && (
<div className="col-6 mb-3">
<label className="form-label">Parcelamento</label>
<select
  className="form-select"
  value={sale.installments || ""}
  onChange={(e) => handleChange("installments", Number(e.target.value))}
>
  <option value="">Selecione o número de parcelas</option>
  <option value={2}>2x</option>
  <option value={3}>3x</option>
  <option value={4}>4x</option>
</select>
</div>
)}

							{/* Observações */}
							<textarea
								className="form-control"
								value={sale.obs}
								onChange={(e) => handleChange("obs", e.target.value)}
								placeholder="Observações da venda..."
							/>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
}
