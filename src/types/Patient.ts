export interface IPatient {
    _id: string;
    caseType: 'Índice' | 'Familiar',
    name: string,
    birthDate: string,
    sex: string,
    phone: string,
    phoneReservation?: string,
    cpf: string,
    rg: string,
    address: string,
    number: string,
    complement?: string,
    neighborhood: string,
    cep: string,
    diagnosis: string,
    summary: string,
}