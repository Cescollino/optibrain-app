/* The props are all in lowercase because otherwise typescript cannot read the data sent from postgreSQL database */

export default interface IPatient {
    noadmsip: number
    firstname: string
    lastname: string
    dateofbirth: string
    gender:'M' | 'F'
    lifetimenumber: number
    weight: number
    idealweight: number
    height: number
    primarydiagnosis: string
    intime: string
    outtime: string | null
    lastloadingtime?: string
}