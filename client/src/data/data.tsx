import { KpiProps, KpisChartData } from "@/state/types";
import { KpisBoxProps } from "@/state/types";

const CATEGORIES: string[] = [
  "Cibles neuromonitorages",
  "Cibles cardio-respiratoires",
  "Monitorage laboratoire",
  "Support général",
];

const PATIENT_RIGHT_EYE_LID: Array<number> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4];
const PATIENT_PVC: Array<number> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 6, 6, 6, 6, 6];

const createKpi = (
  variable: string,
  targetData: Array<number> = PATIENT_RIGHT_EYE_LID,
  targetThreshold: string,
  continueData:  KpisChartData[] = [],
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
  createKpi("Leucopénie", PATIENT_RIGHT_EYE_LID, "NA", [], false),
  createKpi("Calcium", PATIENT_RIGHT_EYE_LID, "NA", [], false),
  createKpi("Hyperleucocytose", PATIENT_RIGHT_EYE_LID, "NA", [], false),
  createKpi("PACO2", PATIENT_RIGHT_EYE_LID, "NA", [], false),
  createKpi("Gaz sanguins", PATIENT_RIGHT_EYE_LID, "NA", [], false),
  createKpi("Marqueurs", PATIENT_RIGHT_EYE_LID, "NA", [], false),
];

export const kpisBoxes: Array<KpisBoxProps> = [
  createKpisBox(CATEGORIES[0], [ 
    createKpi("PPC", PATIENT_RIGHT_EYE_LID, "60-70 mmHg"),
    createKpi("PIC", PATIENT_RIGHT_EYE_LID, "< 20mmHg"),
    createKpi("LICOX", PATIENT_RIGHT_EYE_LID, "25-35 mmHg"),
    createKpi("Pupilles", PATIENT_PVC, "1 fois/hrs"),
  ], false),
 
  createKpisBox(CATEGORIES[1], [
    createKpi("PVC", PATIENT_RIGHT_EYE_LID, "30-40%"),
    createKpi("PAM", PATIENT_RIGHT_EYE_LID, "66-70mmHg"),
    createKpi("ETCO2", PATIENT_RIGHT_EYE_LID, "35-45mmHg"),
    createKpi("PaCO2", PATIENT_RIGHT_EYE_LID, "35-40mmHg"),
    ...optionalKpis,
  ]),
  createKpisBox(CATEGORIES[2], [
    createKpi("Glycémie", PATIENT_RIGHT_EYE_LID, "5-11 mmol/L"),
    createKpi("INR", PATIENT_RIGHT_EYE_LID, "< 1,2"),
    createKpi("Plaquettes", PATIENT_RIGHT_EYE_LID, "> 100 G/L"),
    ...optionalKpis,
  ]),
  createKpisBox(CATEGORIES[3], [
    createKpi("Analgo-Sédation", PATIENT_RIGHT_EYE_LID, "continue"),
    createKpi("Nutrition", PATIENT_RIGHT_EYE_LID, "< 72h"),
    createKpi("Tête de lit", PATIENT_RIGHT_EYE_LID, "30-40°"),
    createKpi("Température", PATIENT_RIGHT_EYE_LID, "36-37°"),
    ...optionalKpis,
  ]),
];
