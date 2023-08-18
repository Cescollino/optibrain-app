import App from "@/App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'

/* REACT QUERY to manage our axios api client */
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
)
