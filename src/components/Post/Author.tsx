import { useEffect, useState } from "react";
import { api } from "../../api";
import "./author.css";

type Author = {
    id: number;
    name: string;
    picture: string;
};

type AuthorCardProps = {
    authorId: string;
};

export default function AuthorCard({ authorId }: AuthorCardProps) {
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState<string>("");

    const getAuthor = async () => {
        try {
            const response = await api.get(`/post/author/${authorId}`);
            const data: Author = response.data;
            setAuthor(data);

            // URLs em ordem de prioridade
            const urls = [
                data.picture, // servidor principal
                `https://img.cdndsgni.com/preview/12705620.jpg`,
            ];

            // Função que carrega a primeira imagem válida
            const loadValidImage = (index: number = 0) => {
                if (index >= urls.length) return; // acabou as opções
                const img = new Image();
                img.onload = () => setImgSrc(urls[index]);
                img.onerror = () => loadValidImage(index + 1);
                img.src = urls[index];
            };

            loadValidImage();
        } catch (error) {
            console.error("Erro ao buscar autor:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAuthor();
    }, [authorId]);

    if (loading) return <p>Carregando autor...</p>;
    if (!author) return <p>Autor não encontrado</p>;

    return (
        <div className="flex items-center text-center gap-3 author">
            <img
                src={imgSrc}
                alt={author.name}
                className=""
            />
            <span>{author.name}</span>
        </div>
    );
}
