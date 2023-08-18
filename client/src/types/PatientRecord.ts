import PatientState from "@/state/patientState"
import IPatient from "@/types/Patient"

// TODO : Create a Patient class to implement this interface
export default interface PatientRecordData {
    data: IPatient
    scans: string | string[] | null
    stayDays: number
    affectedSystems: string[]
    status: PatientState
}
