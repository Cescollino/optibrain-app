import { Box, Typography, Fab } from "@mui/material";
import KpiCircularProgress from "./KpiCircularProgressBar";
import TargetIcon from '@/components/icons/TargetIcon';
import { useEffect, useState } from "react";
import { KpiProps } from "@/types/types";

const Kpi = ({ variable, targetData, targetThreshold, timeFrame , onClick}: KpiProps) => {
    const [score, setScore] = useState<number>(0);

    const calculateTimeFrameScore = (targetData: number[] | undefined, timeFrame: number): number => {
        if (!targetData) return 0;

        const currentHour = targetData.length;
        const relevantData = targetData.slice(currentHour - timeFrame, currentHour);
        if (relevantData.length === 0) return 0;
    
        const sum = relevantData.reduce((acc, value) => acc + value, 0);
        return sum / relevantData.length;
    };

    useEffect(() => {
        const calculatedKpiScore = calculateTimeFrameScore(targetData, timeFrame);
        setScore(calculatedKpiScore);
    }, [targetData, timeFrame]);

    return (
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    
                    width: '80%',
                    minWidth: '279px',
                    minHeight:  '62px',
                }}
                onClick={onClick}
            >
            {/* KpiTarget Header */}
                <Box sx={{ display: 'inline-flex', flexGrow: 1, gap: 0.5 }}> 
                    <TargetIcon fontSize='small' />
                    <Typography variant="h5">{variable}: </Typography> 
                    <Typography variant="h5">{targetThreshold}</Typography>
                </Box>
                <Fab 
                sx={{
                    display: 'flex', 
                    flexGrow: 1,
                    width: '100%', 
                    height: '100%', 
                    background: 'none', 
                    variant: 'extended', 
                    borderRadius: "20px", 
                    '&:hover': { backgroundColor: 'grey'},
                    boxShadow: "2px 2px 5px 0px #00000040",
                }}>
                    <KpiCircularProgress score={score} />
                </Fab>
            </Box>
    );  
}

export default Kpi;