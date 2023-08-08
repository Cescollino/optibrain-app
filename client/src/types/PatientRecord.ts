import PatientState from "@/state/patientState";
import IPatient from "@/types/Patient";

export default interface PatientRecordData {
    data: IPatient;
    scans: string | string[] | null;
    stayDays: number;
    affectedSystems: string[];
    status: PatientState;
}
