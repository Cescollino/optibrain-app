import { Typography } from '@mui/material'

type Props = {
    title: string;
};

const BoxHeader = ({ title }: Props) => {
    return <Typography variant="h4" mb="-0.1rem" mt="1rem" >{title}</Typography>
}

export default BoxHeader;