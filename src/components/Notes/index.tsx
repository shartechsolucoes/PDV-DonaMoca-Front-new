import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    ListItemSecondaryAction,
    Button,
    Avatar,
} from '@mui/material';

type NotesProps = {
    alunos: {
        photo: string | undefined; id: number; name: string; notas?: string;
    }[];
    onSalvar?: (notas: Record<number, number>) => void;
};

const Notes: React.FC<NotesProps> = ({ alunos, onSalvar }) => {
    const [notas, setNotas] = useState<Record<number, number>>({});

    const handleNotaChange = (id: number, valor: string) => {
        const nota = parseFloat(valor);
        if (!isNaN(nota)) {
            setNotas((prev) => ({
                ...prev,
                [id]: nota,
            }));
        }
    };

    const salvarNotas = () => {
        if (onSalvar) onSalvar(notas);
        console.log('Notas salvas:', notas);
    };

    return (
        <>
            <List>
                {alunos.map((aluno) => (
                    <ListItem key={aluno.id} divider>
                        <Avatar src={aluno.photo} sx={{ mr: 2 }} />
                        <ListItemText primary={aluno.name} />
                        <ListItemSecondaryAction>
                            <TextField
                                type="number"
                                inputProps={{ min: 0, max: 10, step: 0.1 }}
                                size="small"
                                value={notas[aluno.id] ?? ''}
                                onChange={(e) => handleNotaChange(aluno.id, e.target.value)}
                                sx={{ width: 80 }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={salvarNotas}>
                Salvar Notas
            </Button>
        </>
    );
};

export default Notes;
