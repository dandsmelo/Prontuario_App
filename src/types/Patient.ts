export interface IPatient {
    _id: string;
    doctorId: string;
    caseType: 'Index' | 'Family',
    indexPatientId?: string,
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