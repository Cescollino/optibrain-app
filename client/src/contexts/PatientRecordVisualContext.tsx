import { createContext } from "react";

type PatientRecordVisualData = {
    selectedVisual: string;
    updateVisualDisplay: (option: string) => void;
};

const PatientRecordVisualContext = createContext<PatientRecordVisualData>({  selectedVisual: 'scan', updateVisualDisplay: () => {} });

export default PatientRecordVisualContext;
