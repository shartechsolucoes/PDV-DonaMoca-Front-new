import { useEffect, useState } from "react";
import { api } from "../../api";
import DynamicTable from "../../components/List";
import Card from "../../components/Cards/Basic";

type TopMarca = {
	marca: string;
	scoreHoje: number;
	scoreOntem: number;
	votosHoje: number;
	votosOntem: number;
	mediaHoje: number;
	diffScore: number;
	pos: number;
	prevPos?: number | null;
	trend: "up" | "down" | "same" | "new";
};

export default function TopWinners() {
	const [topMarcasTop2, setTopMarcasTop2] = useState<TopMarca[]>([]);
	const [topMarcasTop1, setTopMarcasTop1] = useState<TopMarca[]>([]);
	const [filter] = useState("");

	const getTopMarcas = async (top: number, setter: (data: TopMarca[]) => void) => {
		try {
			const response = await api.get("/top/winners/", { params: { top } });
			setter(response.data);
		} catch (error) {
			console.error(`Erro ao buscar top ${top} marcas:`, error);
		}
	};

	const fetchData = () => {
		getTopMarcas(2, setTopMarcasTop2);
		getTopMarcas(1, setTopMarcasTop1);
	};

	useEffect(() => {
		fetchData();
		const interval = setInterval(fetchData, 30000); // auto refresh a cada 30s
		return () => clearInterval(interval);
	}, [filter]);

	const renderTrendIcon = (trend: string) => {
		if (trend === "up") return <span style={{ color: "green", marginRight: 6 }}>▲</span>;
		if (trend === "down") return <span style={{ color: "red", marginRight: 6 }}>▼</span>;
		if (trend === "same") return <span style={{ color: "gray", marginRight: 6 }}>▬</span>;
		return <span style={{ color: "blue", marginRight: 6 }}>★</span>; // new
	};

	const capitalize = (text: string = "") =>
		text
			.toLowerCase()
			.replace(/\b\w/g, (char) => char.toUpperCase());

	const columns = [
		{ header: "#", accessor: (item: TopMarca) => item.pos, sortable: true },
		{
			header: "Marca",
			accessor: (item: TopMarca) => item.marca,
			sortable: true,
			render: (item: TopMarca) => (
				<>
					{renderTrendIcon(item.trend)} {capitalize((item.marca))}
				</>
			),
		},
		// { header: "Votos Ontem", accessor: (item: TopMarca) => item.votosOntem, sortable: true },
		// { header: "Pontuação Ontem", accessor: (item: TopMarca) => item.scoreOntem, sortable: true },
		{ header: "Votos", accessor: (item: TopMarca) => item.votosHoje, sortable: true },
		{ header: "Pontuação", accessor: (item: TopMarca) => item.scoreHoje, sortable: true },
		{ header: "Média", accessor: (item: TopMarca) => item.mediaHoje.toFixed(2), sortable: true },

		{ header: "P/A", accessor: (item: TopMarca) => item.prevPos ?? "-", sortable: true },
	];

	return (
		<div>
			<div className="header-page row">
				<div className="col-3">
					<h2 className="title-page">TOP20 Ranking</h2>
					<p className="url-page">Dashboard / TOP20 / Ranking</p>
				</div>
				<div className="col-9 d-flex justify-content-end">

				</div>
			</div>

			<div className="row">
				<div className="col-3 mt-4">
					<Card
						title=''
						info='Votos'
						content='??'
						footer='?? Votos Hoje'
						icon=''
					/>
				</div>

				<div className="col-3 mt-4">
					<Card
						title=''
						info='Marcas'
						content='??'
						footer='?? Marcas Hoje'
						icon=''
					/>
				</div>

				<div className="col-3 mt-4">
					<Card
						title=''
						info='Votos Industria'
						content='??'
						footer='?? Votos Hoje'
						icon=''
					/>
				</div>

				<div className="col-3 mt-4">
					<Card
						title=''
						info='Votos Fornecedores'
						content='??'
						footer='?? Votos Hoje'
						icon=''
					/>
				</div>
				<div className="col-12 mt-4">
					<div className="card alert">
						IMPORTATE:
						<p className="text-alert">O dados são baseados na posição do dia anterior comparado com a posição de hoje.</p>
					</div>
				</div>
				<div className="col-6 mt-4">
						<h5 className="p-2">Ranking Indústria</h5>
					<div className="card p-0">
						<DynamicTable
							data={topMarcasTop2
								.filter(item => item.marca.toLowerCase().includes(filter.toLowerCase()))
								.slice(0, 25)}
							columns={columns}
						/>
					</div>
				</div>

				{/* Top 1 */}
				<div className="col-6 mt-4">
					<h5 className="p-2">Ranking Fornecedores</h5>
					<div className="card p-0">

						<DynamicTable
							data={topMarcasTop1
								.filter(item => item.marca.toLowerCase().includes(filter.toLowerCase()))
								.slice(0, 25)}
							columns={columns}
						/>
					</div>

				</div>
			</div>
		</div>
	);
}
