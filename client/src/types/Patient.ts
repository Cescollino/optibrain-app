export default interface IPatientData {
    noadmsip: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender:'M' | 'F';
    lifetimeNumber: number;
    weight: number;
    idealWeight: number;
    height: number;
    primaryDiagnosis: string;
    lastLoadingTime?: number;
}