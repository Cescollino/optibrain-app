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
