import { StatusColor, PatientState, PatientStatus } from "@/types/patientState"

export const STABLE_PATIENT: PatientState = {
    status: PatientStatus.STABLE,
    color: StatusColor.GREEN,
}

export const TO_WATCH_PATIENT: PatientState = {
    status: PatientStatus.WATCH,
    color: StatusColor.ORANGE,
}

export const CRITICAL_PATIENT: PatientState = {
    status: PatientStatus.CRITICAL,
    color: StatusColor.RED,
}
