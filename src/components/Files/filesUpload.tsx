import React, { useState } from "react";
import axios from "axios";

export const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:4000/files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (evt) => {
                    const percent = Math.round((evt.loaded * 100) / (evt.total || 1));
                    setProgress(percent);
                }
            });
            setMessage(`✅ Upload concluído: ${res.data.originalName}`);
        } catch (err) {
            setMessage("❌ Erro ao enviar arquivo");
        }
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
            <h3>Upload de Arquivo</h3>
            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileChange} />
            {file && <p>Selecionado: {file.name}</p>}
            <button onClick={handleUpload} disabled={!file}>Enviar</button>
            {progress > 0 && <p>Progresso: {progress}%</p>}
            {message && <p>{message}</p>}
        </div>
    );
};
