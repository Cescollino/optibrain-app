import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

function TargetIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
            <circle cx="8.50002" cy="8.50033" r="5.83333" stroke="#F5F5F5"/>
            <circle cx="8.49998" cy="8.49967" r="1.66667" fill="#1A1A2B" stroke="#F5F5F5"/>
            <path d="M8.5 2.66667V1" stroke="#F5F5F5" strokeLinecap="round"/>
            <path d="M14.3333 8.5L16 8.5" stroke="#F5F5F5" strokeLinecap="round"/>
            <path d="M8.5 15.9997L8.5 14.333" stroke="#F5F5F5" strokeLinecap="round"/>
            <path d="M1.00002 8.5H2.66669" stroke="#F5F5F5" strokeLinecap="round"/>
        </SvgIcon>
    );
  }

export default TargetIcon;