import DashboardBox from '@/components/DashboardBox';
import PatientsRecordTable from '@/components/patientRecord/PatientRecordTable';


const Beds = () => {
    return (
        <DashboardBox sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
            <PatientsRecordTable /> 
        </DashboardBox>
    );
}

export default Beds;