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

export interface PatientState {
    status: PatientStatus;
    color: StatusColor;
}


export interface IconProps { color: string };