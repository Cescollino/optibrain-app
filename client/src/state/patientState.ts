// TODO : when you have all the data, a Patient class with reducers and actions would be better

export enum StatusColor {
    GREEN = '#00C48C',
    SHADOW_GREEN = '#00C48C4D',

    ORANGE = '#EE8422',
    SHADOW_ORANGE = '#EE84224D',
    
    RED = '#D0173E',
    SHADOW_RED = '#D0173E4D',
}

export enum PatientStatus {
    STABLE = "Stable",
    WATCH = "Surveiller",
    CRITICAL = "Critique",
}


export interface IconProps { color?: string };

export default interface PatientState {
    state: PatientStatus;
    color: StatusColor;
}