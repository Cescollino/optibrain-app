import { Grid } from "@mui/material";
import { styled } from "@mui/system";

const Img = styled('img')({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Login() {
  return (
    <Grid container spacing={2} sx={{ maxWidth: '100%', maxHeight: '100%', flexGrow: 1 }} >
      <Grid item>
          <Img alt="complex" src="src/assets/images/LoginBackground.png" />
      </Grid>
    </Grid>
  );
}

