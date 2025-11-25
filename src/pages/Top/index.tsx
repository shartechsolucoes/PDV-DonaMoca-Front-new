import "./styles.css";
import { useEffect, useState } from "react";
import { api } from "../../api";

import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";


import DynamicTable from '../../components/List/index.tsx';
// @ts-ignore
import Badge from "../../components/Badge/StatusTop/index.tsx";
// @ts-ignore
import BadgeType from "../../components/Badge/TypeTop/index.tsx";
import Card from '../../components/Cards/Basic';
import { FaAddressBook, FaFileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {FaBasketShopping, FaPencil} from "react-icons/fa6";


type VoteType = {
	id: number;
	loja: string;
	email: string;
	marca: string;
	nota: number;
	status: number;
	ip: number;
	city: number;
	top: number;
	country: number;
	date: string;
};

export default function Dashboard() {
	const [votes, setVotes] = useState<VoteType[]>([]);
	const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [votesByEmail, setVotesByEmail] = useState<VoteType[]>([]);
	const [loadingVotes, setLoadingVotes] = useState(false); // novo state

	// filtros
	const [filter, setFilter] = useState("");
	const [filterLoja, setFilterLoja] = useState("");
	const [filterTop, setFilterTop] = useState<number | "">("");
	const [filterStatus, setFilterStatus] = useState<number | "">("");
	const [filterEmail, setFilterEmail] = useState("");

	const openSidebar = (vote: VoteType) => {
		setSelectedVote(vote);
		setIsSidebarOpen(true);
		getVotesByEmail(vote.email); // busca todos os votos do mesmo email
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
		setTimeout(() => setSelectedVote(null), 300);
	};

	const getVotes = async () => {
		try {
			const response = await api.get("/top");
			setVotes(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getVotes();
		getData();
		const interval = setInterval(getVotes, 10000); // auto refresh a cada 30s
		return () => clearInterval(interval);
	}, []);

	const handleInputChange = (key: keyof VoteType, value: any) => {
		if (!selectedVote) return;
		setSelectedVote({ ...selectedVote, [key]: value });
	};

	const [totalItems, setTotalItems] = useState({
		totals: { statusPending: 0, statusApproved: 0, statusFailed: 0, total: 0 },
		today: { todayPending: 0, todayApproved: 0, todayFailed: 0, total: 0 }
	});

	const getData = async () => {
		try {
			const response = await api.get(`/top/data`);
			setTotalItems(response.data);
		} catch (error) {
			console.error('Erro ao buscar dados do top:', error);
		}
	};

	const getVotesByEmail = async (email: string) => {
		try {
			setLoadingVotes(true); // inicia o loading
			const res = await api.get(`/top/email/${email}`);
			setVotesByEmail(res.data);
		} catch (err) {
			console.error("Erro ao buscar votos por email:", err);
		} finally {
			setLoadingVotes(false); // finaliza o loading
		}
	};
// Função para formatar data do banco
	function formatVoteDate(dateString: string | null | undefined) {
		if (!dateString) return "-";

		// Converte para Date, mas força que seja interpretada como local
		let parsedDate = new Date(dateString);

		if (isNaN(parsedDate.getTime())) return "-";

		// Ajuste manual para 3 horas a mais se o banco está em UTC
		parsedDate = new Date(parsedDate.getTime() + 3 * 60 * 60 * 1000);

		return isToday(parsedDate)
			? format(parsedDate, "HH:mm", { locale: ptBR })
			: format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
	}

	const handleChangeStatus = async (status: number) => {
		if (!selectedVote) return;

		try {
			await api.put(`/top/${selectedVote.id}`, { ...selectedVote, status });
			getVotes();
			getData();
			closeSidebar();
		} catch (err) {
			console.error("Erro ao atualizar status:", err);
			alert("Erro ao atualizar status.");
		}
	};

	const columns = [
		{
			header: "Data",
			accessor: (item: VoteType) => item.date,
			sortable: true,
			render: (item: VoteType) => formatVoteDate(item.date),
		},
		{ header: "Marca", accessor: (item: VoteType) => item.marca, sortable: true },
		{ header: "Nota", accessor: (item: VoteType) => item.nota, sortable: true },
		{
			header: "Top",
			accessor: (item: VoteType) => item.top,
			sortable: true,
			render: (item: VoteType) => <BadgeType status={item.top} />, // só exibição
		},
		{ header: "Loja", accessor: (item: VoteType) => item.loja, sortable: true },
		{ header: "IP", accessor: (item: VoteType) => item.ip, sortable: true },
		{ header: "Email", accessor: (item: VoteType) => item.email, sortable: true },
		// {
		// 	header: "Email",
		// 	accessor: (item: VoteType) => item.email,
		// 	render: (item: VoteType) => (
		// 		<a
		// 			href={`mailto:${item.email}?subject=Prêmio TOP20&body=Prezado(a),%0D%0A%0D%0AIdentificamos que o voto registrado apresenta indícios de irregularidade no processo de votação do prêmio TOP 20 | Edição 2025.%0D%0A%0D%0ADe acordo com o Regulamento da promoção, votos que não atendam aos critérios de segurança ou que caracterizem tentativa de manipulação dos resultados são automaticamente cancelados.%0D%0A%0D%0AAlertamos ainda que, em caso de reincidência, a marca indicada poderá ser desclassificada do Ranking, sem direito a contestação.%0D%0A%0D%0AAgradecemos a compreensão.%0D%0A%0D%0AAtenciosamente,%0D%0AOrganização do Prêmio TOP 20 | Edição 2025`}
		// 			style={{ color: "#0d6efd", textDecoration: "none", cursor: "pointer" }}
		// 		>
		// 			{item.email}
		// 		</a>
		// 	),
		// 	sortable: true,
		// },
		{ header: "Cidade", accessor: (item: VoteType) => item.city, sortable: true },

		{
			header: "Status",
			accessor: (item: VoteType) => item.status,
			sortable: true,
			render: (item: VoteType) => <Badge status={item.status} />,
		},
		{
			header: 'Ação',
			accessor: (item: VoteType) => (
				<button
					onClick={() => openSidebar(item)}
					style={{ cursor: "pointer", background: "none", border: "none" }}
				>
					<FaPencil/>
				</button>
			),
		},
	];

	const normalizeText = (text: string) =>
		text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

	function formatDate(dateString: string) {
		return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
	}
	const [activeTab, setActiveTab] = useState(0); // 0 = Geral, 1 = Endereço, 2 = Compras

	// filtro aplicado
	const filteredVotes = votes.filter((item) => {
		const byMarca = normalizeText(item.marca).includes(normalizeText(filter));
		const byLoja = normalizeText(item.loja).includes(normalizeText(filterLoja));
		const byTop = filterTop === "" ? true : item.top === filterTop;
		const byStatus = filterStatus === "" ? true : item.status === filterStatus;
		const byEmail = normalizeText(item.email).includes(normalizeText(filterEmail));
		return byMarca && byLoja && byTop && byStatus && byEmail;
	});
	// @ts-ignore
	return (
		<div>
			<div className="row">
				<div className="header-page row">
					<div className="col-3">
						<h2 className="title-page">TOP20 Votos</h2>
						<p className="url-page">Dashboard / TOP20 / Votos</p>
					</div>
					<div className="col-9 d-flex justify-content-end">

					</div>
				</div>
				<div className="col-3 mt-4">
					<Card
						title=''
						info='Total'
						content={totalItems.totals.total}
						footer={`${totalItems.today.total} votos hoje`}
						icon=''
					/>
				</div>

				<div className="col-3 mt-4">
					<Card
						title=''
						info='Aprovados'
						content={totalItems.totals.statusApproved}
						footer={`${totalItems.today.todayApproved} votos aprovados hoje`}
						icon=''
					/>
				</div>

				<div className="col-3 mt-4">
					<Card
						title=''
						info='Pendentes'
						content={totalItems.totals.statusPending}
						footer={`${totalItems.today.todayPending} votos pendentes hoje`}
						icon=''
					/>
				</div>

				<div className="col-3 mt-4">
					<Card
						title=''
						info='Reprovados'
						content={totalItems.totals.statusFailed}
						footer={`${totalItems.today.todayFailed} votos reprovados hoje`}
						icon=''
					/>
				</div>


			</div>

			{/* FILTROS */}
			<div className="row mb-3 mt-3">
				<div className="col-md-2">
					<input
						type="text"
						placeholder="Marca..."
						value={filter}
						className="form-control search-input"
						onChange={(e) => setFilter(e.target.value)}
					/>
				</div>

				<div className="col-md-3">
					<input
						type="text"
						placeholder="Loja..."
						value={filterLoja}
						className="form-control search-input"
						onChange={(e) => setFilterLoja(e.target.value)}
					/>
				</div>

				<div className="col-md-3">
					<input
						type="text"
						placeholder="Email..."
						value={filterEmail}
						className="form-control search-input"
						onChange={(e) => setFilterEmail(e.target.value)}
					/>
				</div>


				<div className="col-md-2">
					<select
						className="form-control search-input"
						value={filterTop}
						onChange={(e) => setFilterTop(e.target.value === "" ? "" : Number(e.target.value))}
					>
						<option value="">Indústria/Fornecedor</option>
						<option value={1}>Fornecedor</option>
						<option value={2}>Indústria</option>
					</select>
				</div>

				<div className="col-md-2">
					<select
						className="form-control search-input"
						value={filterStatus}
						onChange={(e) => setFilterStatus(e.target.value === "" ? "" : Number(e.target.value))}
					>
						<option value="">Status</option>
						<option value={0}>Pendente</option>
						<option value={1}>Aprovado</option>
						<option value={3}>Aguardando</option>
						<option value={2}>Reprovado</option>
					</select>
				</div>
			</div>

			<div className="col-12 mt-4">
				<div className="card p-0">
				<DynamicTable data={filteredVotes} columns={columns} />
				</div>
			</div>

			{selectedVote && (
				<div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}>
					<div className="sidebar" onClick={(e) => e.stopPropagation()}>
						<div className="tabs-menu">
							<ul className="tab-list">
								<li className={activeTab === 0 ? "active" : ""} onClick={() => setActiveTab(0)}>
									<FaFileAlt />
								</li>
								<li className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>
									<FaAddressBook />
								</li>
								<li className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>
									<FaBasketShopping />
								</li>
							</ul>
						</div>

						<div className="sidebar-content">
							<button className="close-btn" onClick={closeSidebar}><IoClose/></button>
							<h3>Editar Voto</h3>
							<hr />

							{/* Aba 0 - Geral */}
							{activeTab === 0 && (
								<>
									<p className="sidebar-content-data">{formatDate(selectedVote.date)}</p>

									<div className="mb-3">
										<label>Loja:</label>
										<p>{selectedVote.loja}</p>
									</div>

									<div className="mb-3">
										<label>Email:</label>
										<p>{selectedVote.email}</p>
									</div>
									<div className="mb-3">
										<label>Cidade:</label>
										<p>{selectedVote.city}</p>
									</div>

									<div className="mb-3">
										<label>Marca:</label>
										<input type="text" value={selectedVote.marca} className="form-control"
											   onChange={(e) => handleInputChange("marca", e.target.value)} />
									</div>

									<div className="mb-3">
										<label>Nota:</label>
										<input type="number" value={selectedVote.nota} className="form-control"
											   onChange={(e) => handleInputChange("nota", Number(e.target.value))} />
									</div>


									<div className="mb-3">
										<label>Top:</label>
										<select value={selectedVote.top} className="form-control"
												onChange={(e) => handleInputChange("top", Number(e.target.value))}>
											<option value={1}>Fornecedor</option>
											<option value={2}>Indústria</option>
										</select>
									</div>


									{loadingVotes ? (
										<div className="d-flex justify-content-center p-3">
											<div className="spinner-border text-primary" role="status">
												<span className="visually-hidden">Carregando...</span>
											</div>
										</div>
									) : (
										(() => {
											const otherVotes = votesByEmail.filter(v => v.id !== selectedVote?.id);

											if (otherVotes.length > 0) {
												return (
													<div style={{ marginTop: "20px" }}>
														<h5>Outros votos deste email:</h5>
														<div className="col-12 mt-4">
															<div className="card p-0">
																<DynamicTable
																	data={otherVotes}
																	columns={[
																		{ header: "Marca", accessor: (v: any) => v.marca },
																		{ header: "Nota", accessor: (v: any) => v.nota },
																		{ header: "ip", accessor: (v: any) => v.ip },
																		{
																			header: "Status",
																			accessor: (v: any) => v.status,
																			sortable: true,
																			render: (v: any) => <Badge status={v.status} />,
																		},
																		{ header: "Data", accessor: (v: any) => formatDate(v.date) },
																	]}
																/>
															</div>
														</div>
													</div>
												);
											} else {
												return <p style={{ marginTop: "20px" }}>Nenhum outro voto encontrado.</p>;
											}
										})()
									)}

								</>
							)}

							{/* Aba 1 - Endereço */}
							{activeTab === 1 && (<></>)}

							{/* Aba 2 - Compras */}
							{activeTab === 2 && (<div><p></p></div>)}
							<div className="d-flex gap-2 mt-3">
								<button
									className="btn btn-success"
									onClick={() => handleChangeStatus(1)} // Aprovado
								>
									Aprovar
								</button>

								<button
									className="btn btn-warning"
									onClick={() => handleChangeStatus(3)} // Aguardando
								>
									Aguardando
								</button>

								<button
									className="btn btn-danger"
									onClick={() => handleChangeStatus(2)} // Reprovado
								>
									Reprovar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

		</div>
	);
}
