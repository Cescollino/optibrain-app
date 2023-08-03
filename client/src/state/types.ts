import { PatientState, PatientStatus } from "@/types/patientState";

export interface KpiProps {
    variable: string;
    targetThreshold: string;
    display?: boolean;

    targetData?: number[];
    continueData?: KpisChartData;
    boxCategory?: string;
    timeFrame: number;

    onClick?: () => void;
}


export interface PatientRecordData {
    patientData: PatientData;
    scans: string | string[] | null;
    stayDays: number;
    affectedSystems: string[];
    status: PatientState;
}

export interface PatientData {
    noadmsip: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    lifetimeNumber: number;
    weight: number;
    idealWeight: number;
    height: number;
    primaryDiagnosis: string;
    lastLoadingTime?: number;
}

export const DefaultPatient = {
    noadmsip: 3563,
    firstName: 'NA',
    lastName: 'NA',
    dateOfBirth: 'NA',
    gender: 'NA',
    lifetimeNumber: 0,
    weight: 0.0,
    idealWeight: 0.0,
    height: 0.0,
    primaryDiagnosis: 'NA',
    lastLoadingTime: undefined,
};


export interface KpiData {
  id: number;
  kpi: string;
  noadmsip: number;
  value: number | string | null;
  unitOfMeasure?: string;
  horodate: number;
}

export interface KpisBoxProps {
  category: string;
  kpis: Array<KpiProps>;
  optional: boolean;
}

export interface KpisChartData {
  data: number[];
  time: string;
  value: number;
}
