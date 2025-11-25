import { useEffect, useState } from "react";
import { api } from "../../api";
import "./categories.css";

type Category = {
    category_id: number | string;
    name: string;
    status: number;
    selected?: boolean; // indica se a categoria está selecionada no post
};

type CategoriesProps = {
    postId: number;
    onChange?: (categories: number[]) => void;
};

export default function Categories({ postId, onChange }: CategoriesProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get(`/post/${postId}/categories-with-selected`);
                const cats: Category[] = res.data || [];
                setCategories(cats);
                if (onChange) {
                    const selectedIds = cats.filter(c => c.selected).map(c => Number(c.category_id));
                    onChange(selectedIds);
                }
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [postId, onChange]);

    const toggleCategory = (id: number) => {
        const updated = categories.map(cat =>
            Number(cat.category_id) === id ? { ...cat, selected: !cat.selected } : cat
        );
        setCategories(updated);

        if (onChange) {
            const selectedIds = updated.filter(c => c.selected).map(c => Number(c.category_id));
            onChange(selectedIds);
        }
    };

    if (loading) return <p>Carregando categorias...</p>;

    return (
        <div className="categories-container">
            {categories.map(cat => {
                const catId = Number(cat.category_id);
                return (
                    <div className="form-check form-switch" key={catId}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`cat-${catId}`}
                            checked={!!cat.selected}
                            onChange={() => toggleCategory(catId)}
                        />
                        <label className="form-check-label" htmlFor={`cat-${catId}`}>
                            {cat.name}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
