import { useEffect, useState } from "react";
import { api } from "../../api";

type PostThumbnailProps = {
    image_id?: string;
    token: string;
};

export default function PostThumbnail({ image_id, token }: PostThumbnailProps) {
    const [preview, setPreview] = useState<string>("");

    // Função auxiliar para montar URL completa
    const getFullUrl = (url: string): string => {
        const baseURL = api.defaults.baseURL?.replace(/\/$/, "") || "";
        const imagePath = url.replace(/^\//, "");
        return `${baseURL}/${imagePath}`;
    };

    useEffect(() => {
        const fetchImage = async () => {
            if (!image_id) return;

            try {
                const res = await api.get(`/image/${image_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data;

                if (data?.url) {
                    const fullUrl = getFullUrl(data.url);
                    setPreview(fullUrl);
                }
            } catch (err) {
                console.error("Erro ao buscar imagem:", err);
            }
        };

        fetchImage();
    }, [image_id, token]);

    if (!preview)
        return (
            <div
                style={{
                    width: 60,
                    height: 60,
                    background: "#f0f0f0",
                    marginRight: 10,
                    borderRadius: 7,
                }}
            />
        );

    return (
        <div
            style={{
                width: 60,
                height: 60,
                backgroundPosition: "center",
                background: "#f0f0f0",
                backgroundImage: `url(${preview})`,
                backgroundSize: "cover",
                marginRight: 10,
                borderRadius: 7,
            }}
        />
    );
}
