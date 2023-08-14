import App from "@/App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import { PatientsProvider } from "@/contexts/PatientsContext"
import { CurrentPatientProvider } from "@/contexts/CurrentPatientContext"
import { AuthenticationProvider } from "@/contexts/AuthenticationContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <PatientsProvider>
                <CurrentPatientProvider>
                    <App />
                </CurrentPatientProvider>
            </PatientsProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
