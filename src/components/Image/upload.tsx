import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "../../api";

type ImageUploadProps = {
    image_id?: string;
    token: string;
    initialLegend?: string;
    onChange: (newImageId: string, newLegend: string) => void;
};

export default function ImageUpload({
                                        image_id: initialImageId,
                                        token,
                                        initialLegend = "",
                                        onChange,
                                    }: ImageUploadProps) {
    const [image_id, setImageId] = useState<string>(initialImageId || "");
    const [preview, setPreview] = useState<string>("");
    const [legend, setLegend] = useState<string>(initialLegend);
    const [loading, setLoading] = useState<boolean>(true);

    // Função auxiliar para montar URL completa
    const getFullUrl = (url: string): string => {
        const baseURL = api.defaults.baseURL?.replace(/\/$/, "") || "";
        const imagePath = url.replace(/^\//, "");
        return `${baseURL}/${imagePath}`;
    };

    // Atualiza valores se mudar props
    useEffect(() => {
        setImageId(initialImageId || "");
        setLegend(initialLegend);
    }, [initialImageId, initialLegend]);

    // Buscar imagem inicial
    useEffect(() => {
        if (!initialImageId) {
            setLoading(false);
            return;
        }

        const fetchImage = async () => {
            try {
                const res = await api.get(`/image/${initialImageId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data;

                if (data) {
                    const fullUrl = getFullUrl(data.url);
                    setImageId(data.image_id.toString());
                    setPreview(fullUrl);
                    setLegend(data.legend || "");
                    onChange(data.image_id.toString(), data.legend || "");
                }
            } catch (err) {
                console.error("Erro ao buscar imagem:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [initialImageId, token, onChange]);

    // Upload de imagem
    const uploadImage = async (file: File) => {
        const form = new FormData();
        form.append("url", file);

        setLoading(true);

        try {
            const res = await api.post("/image", form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res.data;

            if (data?.image_id) {
                const fullUrl = getFullUrl(data.url);
                setImageId(data.image_id.toString());
                setPreview(fullUrl);
                setLegend(data.legend || "");
                onChange(data.image_id.toString(), data.legend || "");
            } else {
                alert("Erro ao enviar imagem.");
            }
        } catch (err) {
            console.error(err);
            alert("Falha no upload da imagem.");
        } finally {
            setLoading(false);
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            uploadImage(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
    });

    const handleLegendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLegend(e.target.value);
        onChange(image_id, e.target.value);
    };

    if (loading) return <p>Carregando imagem...</p>;

    return (
        <>
            <div
                {...getRootProps()}
                style={{
                    borderRadius: 8,
                    position: "relative",
                    width: "100%",
                    minHeight: 200,
                    overflow: "hidden",
                    cursor: "pointer",
                    background: isDragActive ? "#f0f0f0" : "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <input {...getInputProps()} />
                {preview ? (
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />

                        {/* Overlay */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "rgba(0,0,0,0.4)",
                                color: "#fff",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                padding: 10,
                            }}
                        ></div>
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>
                        {isDragActive ? "Solte a imagem aqui..." : "Arraste a imagem ou clique para selecionar"}
                    </p>
                )}
            </div>

            <input
                type="text"
                placeholder="Legenda da imagem"
                value={legend}
                onChange={handleLegendChange}
                style={{
                    width: "100%",
                    padding: "5px 10px",
                    borderRadius: 4,
                    border: "none",
                    marginBottom: 5,
                }}
            />
        </>
    );
}
