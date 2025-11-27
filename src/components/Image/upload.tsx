import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "../../api";

type ImageUploadProps = {
    imageId?: number;
    token: string;
    initialLegend?: string;
    // ALTERADO: agora onChange recebe number para image_id
    onChange: (newImageId: number, newLegend: string) => void;
};

export default function ImageUpload({
                                        imageId: initialImageId,
                                        token,
                                        initialLegend = "",
                                        onChange,
                                    }: ImageUploadProps) {
    // ALTERADO: image_id como number
    const [imageId, setImageId] = useState<number>(initialImageId || 0);
    const [preview, setPreview] = useState<string>("");
    const [legend, setLegend] = useState<string>(initialLegend);
    const [loading, setLoading] = useState<boolean>(true);

    const getFullUrl = (url: string): string => {
        const baseURL = api.defaults.baseURL?.replace(/\/$/, "") || "";
        const imagePath = url.replace(/^\//, "");
        return `${baseURL}/${imagePath}`;
    };

    // Atualiza valores se mudar props
    useEffect(() => {
        if (initialImageId && initialImageId !== imageId) {
            setImageId(initialImageId);
        }
    }, [initialImageId]);

    useEffect(() => {
        setLegend(initialLegend);
    }, [initialLegend]);

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

                    // ALTERADO: setar number (não string)
                    setImageId(data.image_id);
                    setPreview(fullUrl);
                    setLegend(data.legend || "");

                    // IMPORTANTE: não chamar onChange aqui para evitar loop
                    // onChange(data.image_id, data.legend || "");
                }
            } catch (err) {
                console.error("Erro ao buscar imagem:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [initialImageId, token /* remove onChange para evitar loop */]);

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

                // ALTERADO: usar number
                setImageId(data.image_id);
                setPreview(fullUrl);
                setLegend(data.legend || "");

                // DISPARAR onChange aqui (após upload feito pelo usuário)
                onChange(data.image_id, data.legend || "");
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
    }, []); // não precisa onChange nem token aqui

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
    });

    const handleLegendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLegend = e.target.value;
        setLegend(newLegend);

        // ALTERADO: passa number (image_id) para o pai
        onChange(imageId, newLegend);
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
