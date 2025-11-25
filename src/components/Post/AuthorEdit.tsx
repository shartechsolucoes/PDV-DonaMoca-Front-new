import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { api } from "../../api";

type Author = {
    autor_id: number;
    name: string;
    picture?: string; // URL da imagem do autor
};

type AuthorSelectProps = {
    authorId: number;
    onChange: (newId: number) => void;
};

type OptionType = {
    value: number;
    label: string;
    picture?: string;
};

export default function AuthorSelect({ authorId, onChange }: AuthorSelectProps) {
    const [authors, setAuthors] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<OptionType | null>(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const res = await api.get<Author[]>("/authors");
                const options = (res.data || []).map((a) => ({
                    value: a.autor_id,
                    label: a.name,
                    picture: a.picture,
                }));
                setAuthors(options);

                // Seleciona o autor atual se houver
                const current = options.find((o) => o.value === authorId) || null;
                setSelected(current);
            } catch (err) {
                console.error("Erro ao buscar autores:", err);
                setAuthors([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, [authorId]);

    const handleChange = (option: SingleValue<OptionType>) => {
        setSelected(option);
        if (option) onChange(option.value);
    };

    // Custom render para cada option com imagem
    const formatOptionLabel = ({ label, picture }: OptionType) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {picture && <img src={picture} alt={label} style={{ width: 24, height: 24, borderRadius: "50%" }} />}
            <span>{label}</span>
        </div>
    );

    return (
        <Select
            isLoading={loading}
            options={authors}
            value={selected}
            onChange={handleChange}
            formatOptionLabel={formatOptionLabel}
            placeholder="Selecione um autor"
            isClearable
        />
    );
}
