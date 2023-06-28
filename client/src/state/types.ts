export interface KpiProps {
    variable: string;
    targetThreshold: string;
    display?: boolean;

    targetData?: number[];
    continueData?: KpisChartData[];
    boxCategory?: string;
    timeFrame: number;

    onClick?: () => void;
}

export interface KpisBoxProps {
  category: string;
  kpis: Array<KpiProps>;
  optional: boolean;
}

export interface KpisChartData {
  variable: string;
  time: number;
  value: number;
}

/* 
  * Numéro d'admission : enconterid ou noAdmSip même chose 
  * Le encounterid peut etre utilisé dans piicix_num (ou sig) pour trouver 
  * les infos des patients des soins intensifs.
  * */
export interface Patient {
  enconterid?: number;
  noAdmSip?: number;
};

interface LAB_VARIABLES {
  INR: "INR",
  PaCO2: "PaCO2",
  glycemie: "Glycémie",

};

// export interface VARIABLES {
//   PIC: string,
//   PICm: string,
//   PPC: string,
//   licox: string,
//   licoxContinu: string,
//   PVC: string, 
//   PVCm: string,
//   PAM: string, 
//   PAm: string,
//   ETCO2: string,
//   PaCO2: string, 
//   temperatureContinue: string,
//   temperatureManuelle: string,
//   pupilleDroite: string,
//   pupilleGauche: string,
//   glycemie: string,
//   INR: string, 
//   plaquettes: string,
//   positionTeteDuLit: string,
// }

interface ICCA_VARIABLES {
  PIC: "PIC", 
  PICm: "PICm",
  PPC: "PPC", 
  licox: "Licox", 
  licoxContinu: "Pm",
  PVC: "PVC", 
  PVCm: "PVCm",
  PAM: "PAM",
  PAm: "PAm", 
  ETCO2: "EtCO2", 
  PaCO2: "PaCO2", 
  temperatureContinue: "Temp Continue",
  temperatureManuelle: "Temp Manuelle",
  pupilleDroite: "Pupille D",
  pupilleGauche: "Pupille G",
  glycemie: "Glycémie", 
  INR: "INR", 
  plaquettes: "plaquettes", 
  positionTeteDuLit: "position tête",
  labVar: LAB_VARIABLES;
};

export interface ICCA {

  noadmisp: Patient;

  /* Numéro de dossier */
  lifeTimeNumber: number;
  variableList: ICCA_VARIABLES;
};


