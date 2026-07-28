export interface IAttendance {
  _id?: string;
  patientId: string;
  doctorId: string;
  date: string;
  anamnesis: string;
  diagnosis: string;
  conduct: string;
  prescription: string;
  observations?: string;
}
