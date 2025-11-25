import { useEffect, useRef, useState } from "react";
import {
    Chart,
    BarController,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    ArcElement,
    RadarController,
    PieController,
    DoughnutController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "bootstrap/dist/css/bootstrap.min.css";

Chart.register(
    BarController,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    ArcElement,
    RadarController,
    PieController,
    DoughnutController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartDataLabels
);

type ChartItem = {
    label: string;
    value: number;
    color: string;
};

export default function DynamicChartGenerator() {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);

    const [chartType, setChartType] = useState<"bar" | "line" | "pie" | "doughnut" | "radar">("bar");
    const [title, setTitle] = useState("EXPORTAÇÕES MÊS DE AGOSTO PARA OS EUA (US$ milhões)");
    const [source, setSource] = useState("Fonte: Moveis de Valor");
    const [chartWidth, setChartWidth] = useState(600);
    const [chartHeight, setChartHeight] = useState(400);

    const [items, setItems] = useState<ChartItem[]>([
        { label: "2016", value: 13571, color: "#4c9694" },
        { label: "2017", value: 16232, color: "#5fa8a5" },
    ]);

    // Adiciona novo rótulo ao apertar Enter
    const handleAddLabel = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim() !== "") {
            setItems([...items, { label: (e.target as HTMLInputElement).value.trim(), value: 0, color: "#4c9694" }]);
            (e.target as HTMLInputElement).value = "";
        }
    };

    // Atualiza item
    const handleItemChange = (index: number, field: "label" | "value" | "color", val: string) => {
        const newItems = [...items];
        if (field === "value") newItems[index][field] = parseFloat(val) || 0;
        else newItems[index][field] = val;
        setItems(newItems);
    };

    // Atualiza o gráfico
    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        if (chartInstance) chartInstance.destroy();

        const labelArray = items.map((i) => i.label);
        const valueArray = items.map((i) => i.value);
        const colorArray = items.map((i) => i.color);
        const isBarOrLine = chartType === "bar" || chartType === "line";

        const titleHeight = 40;
        const bottomPadding = 30;

        chartRef.current.width = chartWidth;
        chartRef.current.height = chartHeight + titleHeight + bottomPadding;

        const newChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labelArray,
                datasets: [
                    {
                        label: title,
                        data: valueArray,
                        backgroundColor: colorArray.map(c => (chartType === "line" ? c + "99" : c)),
                        borderColor: colorArray,
                        borderWidth: chartType === "line" ? 2 : 1,
                        borderRadius: chartType === "bar" ? 5 : 0,
                        fill: chartType === "line",
                        tension: 0.3,
                        pointBackgroundColor: chartType === "line" ? colorArray : undefined,
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                layout: {
                    padding: { top: titleHeight, bottom: bottomPadding, left: 20, right: 20 },
                },
                plugins: {
                    title: { display: true, text: title, font: { size: 16, weight: "bold" }, color: "#000", padding: { top: 10, bottom: 10 } },
                    legend: { display: chartType !== "bar" && chartType !== "line" },
                    tooltip: { enabled: true },
                    datalabels: {
                        display: true,
                        color: "#000",
                        font: { weight: "bold", size: 12 },
                        anchor: isBarOrLine ? "end" : "center",
                        align: isBarOrLine ? "end" : "center",
                        formatter: (value: number) => value.toLocaleString("pt-BR", { minimumFractionDigits: 0 }),
                    },
                },
                scales: isBarOrLine
                    ? { x: { grid: { display: false }, ticks: { color: "#333", font: { size: 12 } } }, y: { grid: { display: false }, ticks: { display: false }, border: { display: false } } }
                    : {},
            },
            plugins: [ChartDataLabels],
        });

        setChartInstance(newChart);
    }, [items, title, chartType, chartWidth, chartHeight]);

    const handleDownload = () => {
        if (!chartRef.current) return;
        const url = chartRef.current.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title.replace(/\s+/g, "_")}.png`;
        link.click();
    };

    return (
        <div className="row mb-4 mt-4">
            {/*<div className="col-md-12">*/}
            {/*    <div className="card p-4">*/}
            {/*    <div className="row">*/}

            {/*    </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3 mt-4">
                        <div className="card p-4">
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Tipo de gráfico</label>
                                <select
                                    className="form-select"
                                    value={chartType}
                                    onChange={(e) => setChartType(e.target.value as any)}
                                >
                                    <option value="bar">Barras</option>
                                    <option value="line">Linha</option>
                                    <option value="pie">Pizza</option>
                                    <option value="doughnut">Rosca</option>
                                    <option value="radar">Radar</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Largura (px)</label>
                                <input type="number" className="form-control" value={chartWidth} onChange={(e) => setChartWidth(parseInt(e.target.value))} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Altura (px)</label>
                                <input type="number" className="form-control" value={chartHeight} onChange={(e) => setChartHeight(parseInt(e.target.value))} />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Título do gráfico</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Fonte</label>
                                <input type="text" className="form-control" value={source} onChange={(e) => setSource(e.target.value)} />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Adicionar rótulo</label>
                                <input type="text" className="form-control" placeholder="Digite o rótulo e pressione Enter" onKeyDown={handleAddLabel} />
                            </div>

                            {items.map((item, index) => (
                                <div key={index} className="row g-2 mb-1 align-items-center mt-1">
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" value={item.label} onChange={(e) => handleItemChange(index, "label", e.target.value)} />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="number" className="form-control" value={item.value} onChange={(e) => handleItemChange(index, "value", e.target.value)} />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="color" className="form-control form-control-color" value={item.color} onChange={(e) => handleItemChange(index, "color", e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    <div className="col-md-9 mt-4">
                        <div className="card p-4">
                            <div className="text-end mt-3">
                                <button className="btn btn-success" onClick={handleDownload}>📊 Baixar como PNG</button>
                            </div>
                            <div className="mx-auto" style={{ position: "relative", width: chartWidth + 40 }}>
                                <canvas ref={chartRef} style={{ display: "block", margin: "0 auto" }}></canvas>
                                <p className="text-muted" style={{ fontSize: 13, fontStyle: "italic", position: "absolute", bottom: 10, right: 20 }}>
                                    {source}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}
