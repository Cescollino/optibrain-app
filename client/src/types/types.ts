// TODO: This was created before having the data, so it's not accurate and needs modifications
export interface KpiProps {
    variable: string
    targetThreshold: string
    display?: boolean

    // Between 0 and 1 
    targetData?: number[]
    continueData?: DefaultChartData
    boxCategory?: string
    timeFrame: number

    onClick?: () => void
}

export interface DefaultChartData {
  data: number[]
  time: string
  value: number
}


export interface KpiData {
  id: number
  kpi: string
  noadmsip: number
  value: number | string | null
  unitOfMeasure?: string
  horodate: number
}

export interface KpisBoxProps {
  category: string
  kpis: KpiProps[]
  optional: boolean
}

export interface KpisChartData {
  data: number | string | null
  time: string
  value: number
}
