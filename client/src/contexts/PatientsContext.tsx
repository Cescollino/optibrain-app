import PatientService from '@/services/PatientService'
import IPatient from '@/types/Patient'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

type IPatientsContext = {
  patients: IPatient[] | undefined
  status: string
  error: any
}

async function getAllPatients() {
  const patientsFetched = await PatientService.findAll()
  return patientsFetched
}

const PatientsContext = createContext<IPatientsContext>(undefined!);

export function PatientsProvider({ children }: { children: React.ReactNode }) {
    const { status, error, data: patients } = useQuery({ queryKey : ["patients"], queryFn: getAllPatients })
    
    return (
    <PatientsContext.Provider value={{ status, error, patients }}>
        {children}
    </PatientsContext.Provider>
    )
}

export const usePatients = () => useContext(PatientsContext)