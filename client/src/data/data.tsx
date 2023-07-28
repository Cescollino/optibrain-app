import { KpiProps, KpisChartData } from "@/state/types";
import { KpisBoxProps } from "@/state/types";

const CATEGORIES: string[] = [
  "Cibles neuromonitorages",
  "Cibles cardio-respiratoires",
  "Monitorage laboratoire",
  "Support général",
];

const noData = { data: [], time: '2023-01-01 00:00:00', value: 87.9 } as KpisChartData;
const PATIENT_RIGHT_EYE_LID: Array<number> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4];
const PATIENT_PVC: Array<number> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 6, 6, 6, 6, 6];

const createKpi = (
  variable: string,
  targetData: Array<number> = PATIENT_RIGHT_EYE_LID,
  targetThreshold: string,
  continueData:  KpisChartData,
  display: boolean = true,
  timeFrame: number = 3,
): KpiProps => ({
  variable,
  targetData,
  targetThreshold,
  continueData,
  timeFrame,
  display,
});

const createKpisBox = (
  category: string,
  kpis: Array<KpiProps>,
  optional: boolean = true,
): KpisBoxProps => ({
  category,
  kpis,
  optional,
});

export const optionalKpis: Array<KpiProps> = [
  createKpi("Leucopénie", PATIENT_RIGHT_EYE_LID, "NA", noData, false),
  createKpi("Calcium", PATIENT_RIGHT_EYE_LID, "NA", noData, false),
  createKpi("Hyperleucocytose", PATIENT_RIGHT_EYE_LID, "NA", noData, false),
  createKpi("PACO2", PATIENT_RIGHT_EYE_LID, "NA", noData, false),
  createKpi("Gaz sanguins", PATIENT_RIGHT_EYE_LID, "NA", noData, false),
  createKpi("Marqueurs", PATIENT_RIGHT_EYE_LID, "NA", noData, false),
];

export const kpisBoxes: Array<KpisBoxProps> = [
  createKpisBox(CATEGORIES[0], [ 
    createKpi("PPC", PATIENT_RIGHT_EYE_LID, "60-70 mmHg", { data: PATIENT_RIGHT_EYE_LID, time: '2023-07-01 12:00:00', value: 20 } as KpisChartData , true),
    createKpi("PIC", PATIENT_RIGHT_EYE_LID, "< 20mmHg", { data: PATIENT_RIGHT_EYE_LID, time: '2023-07-01 12:00:00', value: 20 } as KpisChartData ,),
    createKpi("LICOX", PATIENT_RIGHT_EYE_LID, "25-35 mmHg", noData),
    createKpi("Pupilles", PATIENT_PVC, "1 fois/hrs", noData),
  ], false),
 
  createKpisBox(CATEGORIES[1], [
    createKpi("PVC", PATIENT_RIGHT_EYE_LID, "30-40%", noData),
    createKpi("PAM", PATIENT_RIGHT_EYE_LID, "66-70mmHg", noData),
    createKpi("ETCO2", PATIENT_RIGHT_EYE_LID, "35-45mmHg", noData),
    createKpi("PaCO2", PATIENT_RIGHT_EYE_LID, "35-40mmHg", noData),
    ...optionalKpis,
  ]),
  createKpisBox(CATEGORIES[2], [
    createKpi("Glycémie", PATIENT_RIGHT_EYE_LID, "5-11 mmol/L", noData),
    createKpi("INR", PATIENT_RIGHT_EYE_LID, "< 1,2", noData),
    createKpi("Plaquettes", PATIENT_RIGHT_EYE_LID, "> 100 G/L", noData),
    ...optionalKpis,
  ]),
  createKpisBox(CATEGORIES[3], [
    createKpi("Analgo-Sédation", PATIENT_RIGHT_EYE_LID, "continue", noData),
    createKpi("Nutrition", PATIENT_RIGHT_EYE_LID, "< 72h", noData),
    createKpi("Tête de lit", PATIENT_RIGHT_EYE_LID, "30-40°", noData),
    createKpi("Température", PATIENT_RIGHT_EYE_LID, "36-37°", noData),
    ...optionalKpis,
  ]),
];
