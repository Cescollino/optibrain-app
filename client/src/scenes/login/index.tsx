import { Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/contexts/AuthentificationContext'
import { useContext } from "react";

const styles = {
  loginContainer: {
    backgroundImage: `url(${"src/assets/images/LoginBackground.png"})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
 };

const Login = () => {
  
  const {authenticated, setAuthenticated} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleLogin = () => {
    setAuthenticated(true)
    navigate('/')
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%', height: '100%', flexGrow: 1, padding: 0, margin: 0 }} style={styles.loginContainer} >
      <Grid item>
          <button onClick={() => handleLogin()}>Authenticate</button>
      </Grid>
    </Grid>
  );

} 

export default Login;
