import React, { useState } from "react";
import { TextField, Chip, Box } from "@mui/material";

type TagsProps = {
    initialTags?: string; // ex: "React,Node"
    onChange?: (tags: string) => void; // retorna string separada por vírgula
    name?: string; // opcional, se quiser usar input hidden
};

export default function Tags({ initialTags = "", onChange, name }: TagsProps) {
    const [tags, setTags] = useState<string[]>(
        initialTags.split(",").map((t) => t.trim()).filter(Boolean)
    );
    const [inputValue, setInputValue] = useState("");

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                const updated = [...tags, newTag];
                setTags(updated);
                onChange?.(updated.join(",")); // atualiza parent
            }
            setInputValue("");
        }
    };

    const handleDelete = (tagToDelete: string) => {
        const updated = tags.filter((tag) => tag !== tagToDelete);
        setTags(updated);
        onChange?.(updated.join(","));
    };

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Digite e pressione Enter ou ,"
                variant="outlined"
                className='w-100'
            />
            {tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDelete(tag)}
                    color="primary"
                    variant="outlined"
                />
            ))}



            {name && <input type="hidden" name={name} value={tags.join(",")} />}
        </Box>
    );
}
