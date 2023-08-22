type MonitoringCategories = "neuro" | "cardio" | "labo" | "general"

type KpiVariablesType = "ppc" | "pic" | "licox" | "pupilles" | "pvc" | "pam" | "etco2" | "paco2" | "glycemie" | "inr" | "plaquettes" | "analgo" | "nutrition" | "tete" | "temperature"
  
type KpiHeader = string[]

type MonitoringHeaderMap = {
  [key in MonitoringCategories]: KpiHeader
}

interface IKpiConstant {
    variable: string
    threshold: string
    unitOfMeasure: string
}

export const monitoringHeaders: MonitoringHeaderMap = {
  neuro: [
    "PPC: 60-70 mmHg",
    "PIC: < 20mmHg",
    "LICOX: 25-35 mmHg",
    "Pupilles: 1 fois/hrs",
  ],
  cardio: [
    "PVC: 30-40%",
    "PAm: 66-70mmHg",
    "ETCO2: 35-45mmHg",
    "PaCO2: 35-40mmHg",
  ],
  labo: [
    "Glycémie: 5-11 mmol/L",
    "INR: < 1.2",
    "Plaquettes: > 100 G/L",
  ],
  general: [
    "Analgo-Sédation: continue",
    "Nutrition: < 72h",
    "Tête de lit: 30-40°",
    "Température: 36-37°",
  ],
}

 
const getKpisConstants = (): {
  [key in MonitoringCategories]: {
    [kpiKey in KpiVariablesType]?: IKpiConstant
  }
} => {
  return {
    neuro: {
      ppc: { variable: "PPC", threshold: "60-70", unitOfMeasure: "mmHg" },
      pic: { variable: "PICm", threshold: "< 20", unitOfMeasure: "mmHg" },
      licox: { variable: "LICOX", threshold: "25-35", unitOfMeasure: "mmHg" },
      pupilles: { variable: "Pupilles", threshold: "1", unitOfMeasure: "fois/hrs" },
    },
    cardio: {
      pvc: { variable: "PVCm", threshold: "30-40", unitOfMeasure: "%" },
      pam: { variable: "PAm", threshold: "66-70", unitOfMeasure: "mmHg" },
      etco2: { variable: "ETCO2", threshold: "35-45", unitOfMeasure: "mmHg" },
      paco2: { variable: "PaCO2", threshold: "35-40", unitOfMeasure: "mmHg" },
    },
    labo: {
      glycemie: { variable: "Glycémie", threshold: "5-11", unitOfMeasure: "mmol/L" },
      inr: { variable: "INR", threshold: "< 1.2", unitOfMeasure: "" },
      plaquettes: { variable: "Plaquettes", threshold: "> 100", unitOfMeasure: "G/L" },
    },
    general: {
      analgo: { variable: "Analgo-Sédation", threshold: "continue", unitOfMeasure: "" },
      nutrition: { variable: "Nutrition", threshold: "< 72", unitOfMeasure: "h" },
      tete: { variable: "Tête de lit", threshold: "30-40", unitOfMeasure: "°" },
      temperature: { variable: "Température", threshold: "36-37", unitOfMeasure: "°" },
    },
  }
}

export const kpisConstants = getKpisConstants();


  