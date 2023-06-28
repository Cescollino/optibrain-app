import { Box, styled } from '@mui/material'

const KpiBox = styled(Box) (({ theme }) => ({
        flexGrow: 1,
        minWidth: '278px',
        minHeight: '30px',

        backgroundColor: theme.palette.black[500],
        borderRadius: "20px",
        boxShadow: "2px 2px 5px 0px #00000040",
    })
);

export default KpiBox;
