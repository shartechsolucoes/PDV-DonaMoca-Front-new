export type StatusChamada = 'presente' | 'falta' | 'justificada';

export type RegistroChamada = {
    data: string; // formato ISO: yyyy-mm-dd
    alunoId: number;
    alunoNome: string;
    status: StatusChamada;
};
