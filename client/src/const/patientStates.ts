import { StatusColor, PatientStatus } from "@/state/patientState";
import PatientState from "@/state/patientState";

export const STABLE_PATIENT: PatientState = {
    state: PatientStatus.STABLE,
    color: StatusColor.GREEN,
}

export const TO_WATCH_PATIENT: PatientState = {
    state: PatientStatus.WATCH,
    color: StatusColor.ORANGE,
}

export const CRITICAL_PATIENT: PatientState = {
    state: PatientStatus.CRITICAL,
    color: StatusColor.RED,
}
