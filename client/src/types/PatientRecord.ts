import PatientState from "@/state/patientState";
import IPatientData from "@/types/Patient";

export default interface PatientRecordData {
    data: IPatientData;
    scans: string | string[] | null;
    stayDays: number;
    affectedSystems: string[];
    status: PatientState;
}
