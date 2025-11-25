import { useEffect, useState } from "react";
import { api } from "../../api";

type PostThumbnailProps = {
    image_id?: string;
    width?: string | number;  // aceita "100%" ou 200
    height?: string | number; // aceita "130px" ou 200
};

export default function PostThumbnail({ image_id, width = "100%", height = 130 }: PostThumbnailProps) {
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        const fetchImage = async () => {
            if (!image_id) return;

            try {
                const res = await api.get(`/image/${image_id}`);
                const data = res.data;

                if (data?.url) {
                    const baseURL = api.defaults.baseURL?.replace(/\/$/, "") || "";
                    const imagePath = data.url.replace(/^\//, "");
                    const fullUrl = `${baseURL}/${imagePath}`;

                    setPreview(fullUrl);
                } else {
                    setPreview("");
                }
            } catch (err) {
                console.error("Erro ao buscar imagem:", err);
                setPreview("");
            }
        };

        fetchImage();
    }, [image_id]);

    const style = {
        width,
        height,
        backgroundPosition: "center" as const,
        backgroundSize: "cover" as const,
        backgroundColor: "#f0f0f0",
        marginRight: 10,
        // borderRadius: preview ? "5px 0px 0px 5px" : 5,
        backgroundImage: preview ? `url(${preview})` : undefined,
    };

    return <div style={style} />;
}
