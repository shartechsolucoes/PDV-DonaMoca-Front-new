import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Card from "../../components/Cards/Basic/index.tsx";
import { NavLink } from "react-router-dom";
import "./index.css";

interface CountryMetric {
	id: string; // ISO-A3 (ex: "BRA")
	name: string;
	value: number; // calculado a partir de change
	color: string;
	change: number; // percentual
}

const TOTAL_BASE = 41855;

// baseCountryMetrics mantém apenas change e cor; value será calculado
const baseCountryMetrics: Record<string, Omit<CountryMetric, "value">> = {
	// Américas
	BRA: { id: "BRA", name: "Brasil", color: "#16a34a", change: 79.9 },
	USA: { id: "USA", name: "Estados Unidos", color: "#2563eb", change: 9 },
	CAN: { id: "CAN", name: "Canadá", color: "#3b82f6", change: 0.9 },
	MEX: { id: "MEX", name: "México", color: "#60a5fa", change: 0.8 },
	ARG: { id: "ARG", name: "Argentina", color: "#93c5fd", change: 2 },
	CHL: { id: "CHL", name: "Chile", color: "#bfdbfe", change: 0.7 },
	COL: { id: "COL", name: "Colômbia", color: "#a5b4fc", change: 1.0 },

	// Europa
	PRT: { id: "PRT", name: "Portugal", color: "#facc15", change: 2 },
	ESP: { id: "ESP", name: "Espanha", color: "#93c5fd", change: 0.5 },
	ITA: { id: "ITA", name: "Itália", color: "#2563eb", change: 0.4 },
	GBR: { id: "GBR", name: "Reino Unido", color: "#1d4ed8", change: 0.3 },

	// Ásia
	CHN: { id: "CHN", name: "China", color: "#dc2626", change: 1.7 },
	IND: { id: "IND", name: "Índia", color: "#22c55e", change: 0.5 },

	// África
	ZAF: { id: "ZAF", name: "África do Sul", color: "#3b82f6", change: 0.2 },

	// Oceania
	AUS: { id: "AUS", name: "Austrália", color: "#3b82f6", change: 0.1 },
};

// calcula valores (value) a partir do percentual change
const initialCountryMetrics: Record<string, CountryMetric> = Object.fromEntries(
	Object.entries(baseCountryMetrics).map(([k, v]) => [
		k,
		{
			...v,
			value: Math.ceil((v.change / 100) * TOTAL_BASE),
		},
	])
);


// Mapa N3 (numérico do topojson) -> ISO-A3
// Eu incluí os países usados no seu dataset. Se precisar de mais, eu gero o arquivo completo.
const isoMap: Record<string, string> = {
	"076": "BRA",
	"840": "USA",
	"124": "CAN",
	"484": "MEX",
	"032": "ARG",
	"152": "CHL",
	"170": "COL",
	"620": "PRT",
	"724": "ESP",
	"380": "ITA",
	"826": "GBR",
	"156": "CHN",
	"356": "IND",
	"710": "ZAF",
	"036": "AUS",
};

export default function Users() {
	const [geographies, setGeographies] = useState<any[]>([]);
	const [countryMetrics] = useState<Record<string, CountryMetric>>(initialCountryMetrics);
	const [dateStart, setDateStart] = useState("2025-01-01");
	const [dateEnd, setDateEnd] = useState("2025-10-13");

	useEffect(() => {
		fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
			.then((res) => res.json())
			.then((worldData) => {
				// @ts-ignore
				const geo = feature(worldData, worldData.objects.countries).features;
				setGeographies(geo);
			})
			.catch((err) => console.error("Erro ao carregar mapa:", err));
	}, []);

	// pré-cálculos: min/max para gradiente e totais
	const values = Object.values(countryMetrics).map((c) => c.value);
	const min = Math.min(...values);
	const max = Math.max(...values);

	const getBlueShade = (val: number) => {
		const intensity = (val - min) / (max - min || 1);
		const lightness = 85 - intensity * 60;
		return `hsl(210, 80%, ${lightness}%)`;
	};

	// debug: mostra geos que não casaram com seus dados (apenas quando geographies já carregou)
	useEffect(() => {
		fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
			.then((res) => res.json())
			.then((worldData) => {
				// @ts-ignore
				const geo = feature(worldData, worldData.objects.countries).features;
				setGeographies(geo);

				// 👇 Adicione este log temporário:
				const brasil = geo.find(
					(g: any) =>
						g.properties?.name?.toLowerCase() === "brazil" ||
						g.properties?.name?.toLowerCase() === "brasil"
				);
				console.log("DEBUG Brasil:", brasil?.id, brasil?.properties);
			})
			.catch((err) => console.error("Erro ao carregar mapa:", err));
	}, []);

	return (
		<div className="row mb-4">
			{/* HEADER */}
			<div className="header-page row mb-4">
				<div className="col-3">
					<img
						src="https://www.anuariodecolchoes.com.br/theme/2025/assets/img/logo-h.png"
						className="img-fluid w-50"
					/>
				</div>
				<div className="col-9 d-flex justify-content-end gap-2">
					<div><input
						type="date"
						className="form-control"
						value={dateStart}
						onChange={(e) => setDateStart(e.target.value)}
						style={{ borderRadius: 10 }}
					/></div>
						<div>
					<input
						type="date"
						className="form-control"
						value={dateEnd}
						onChange={(e) => setDateEnd(e.target.value)}
						style={{ borderRadius: 10 }}
					/>
						</div>
				<div>
					<NavLink to="/users/new" className="btn btn-info">
						Filtrar
					</NavLink>
			</div>
				</div>
			</div>

			{/* CARDS */}
			<div className="row mb-3">
				{[
					{ title: "Acessos", content: "54.202", icon: 'view', info: '', footer:'' },
					{ title: "Acessos Únicos", content: "41.862", icon: 'view', info: '', footer:''  },
					{ title: "Páginas Visualizadas", content: "205.248", icon: 'view', info: '', footer:'' },
					{ title: "Matérias Publicadas", content: "37", icon: 'view', info: '', footer:''  },
					{ title: "Downloads Anuário", content: "7.602", icon: 'view', info: '', footer:'' },
				].map((c, i) => (
					<div className="col-2" key={i}>
						<Card icon={c.icon} title={c.title} content={c.content} info={c.info} footer={c.footer} />
					</div>
				))}
			</div>

			{/* MAPA + LISTA */}
			<div className="col-12 mt-3">
				<div className="card p-3">
					<div className="row">
						<div className="col-8">
							{geographies.length > 0 ? (
								<ComposableMap
									projection="geoMercator"
									projectionConfig={{ scale: 100, center: [0, 10] }}
									width={980}
									height={400}
									style={{ width: "100%", height: "auto" }}
								>
									<Geographies geography={geographies}>
										{({ geographies }) =>
											geographies.map((geo) => {
												const idNum = String(geo.id);
												// prefer ISO_A3 da propriedade, senão usa mapa numérico
												const isoAlpha = geo.properties?.ISO_A3 || isoMap[idNum];
												const metric = isoAlpha ? countryMetrics[isoAlpha] : null;
												const fill = metric ? getBlueShade(metric.value) : "#e5e7eb";

												return (
													<Geography
														key={geo.rsmKey}
														geography={geo}
														fill={fill}
														stroke="#fff"
														strokeWidth={0.4}
														data-tooltip-id="tooltip"
														data-tooltip-content={
															metric
																? `${metric.name}: ${metric.value.toLocaleString("pt-BR")}`
																: geo.properties?.name || "Sem dados"
														}
														style={{
															default: { outline: "none" },
															hover: { outline: "none", cursor: "pointer", opacity: 0.85 },
															pressed: { outline: "none" },
														}}
													/>
												);
											})
										}
									</Geographies>
								</ComposableMap>
							) : (
								<p>Carregando mapa...</p>
							)}

							<Tooltip id="tooltip" />
						</div>

						{/* LISTA */}
						<div className="col-4 country">
							{Object.values(countryMetrics)
								.sort((a, b) => b.value - a.value)
								.map((country) => (
									<div key={country.id} className="country-item d-flex justify-content-between">
										<div>{country.name}</div>
										<div>
											{country.value.toLocaleString("pt-BR")}
										</div>
									</div>
								))}

							{/*<div*/}
							{/*	className="country-item total d-flex justify-content-between"*/}
							{/*	style={{ borderTop: "1px solid #ddd", marginTop: 10, paddingTop: 6, fontWeight: 700 }}*/}
							{/*>*/}
							{/*	<div>Total</div>*/}
							{/*	<div>*/}
							{/*		{totalValue.toLocaleString("pt-BR")} — {totalChange.toFixed(1)}%*/}
							{/*	</div>*/}
							{/*</div>*/}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
