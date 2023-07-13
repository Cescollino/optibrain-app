import { Box, styled } from '@mui/material'

const KpiProgressBox = styled(Box)<{ progress: number }> (({ theme, progress }) => ({
        width: `${progress}%`,
        height: '30px',
        textAlign: 'center',
        alignItems: 'center',
        minWidth: '2rem',
        
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "20px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
    })
);

export default KpiProgressBox;