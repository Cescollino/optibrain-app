import { Typography, Box } from '@mui/material'

type Props = {
    title: string;
    indicator?: string;
    indicatorColor?: string;
};

const PatientRecordHeader = ({ title, indicator, indicatorColor }: Props) => {
    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'flex-start', gap: '0.5rem' }}
        >
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h4" color={indicatorColor}>{indicator}</Typography>
        </Box>
  )
}

export default PatientRecordHeader;