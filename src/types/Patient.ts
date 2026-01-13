export interface IPatient {
    _id: string;
    caso: 'Índice' | 'Familiar',
    nome: string,
    dt_nascimento: string,
    sexo: string,
    telefone: string,
    telefone_reserva?: string,
    cpf: string,
    rg: string,
    endereco: string,
    numero: string,
    complemento?: string,
    bairro: string,
    cep: string,
    diagnostico: string,
    resumo: string,
}