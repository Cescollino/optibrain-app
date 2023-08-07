import { Button, Grid, Paper, Typography, Input, styled } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { useContext, useState, useEffect } from "react";


const LoginContainer = styled(Grid) (
  {
    flexGrow: 1, 
    width: '100%',
    height: '100%', 
    padding: 0, 
    margin: 0,
    backgroundImage: `url(${"src/assets/images/loginBackground.png"})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
);

const LoginPaper = styled(Paper) (
  {
    marginTop: '20%',
    backgroundColor:' rgba(255, 255, 255, 0.4)',
  }
);

const loginText = { title: 'Connexion', username: 'Nom d'+"'"+'utilisateur', password: 'Mot de passe' }

const Login = () => {
  
  const [ username, setUserName ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const { authenticated, setAuthenticated } = useContext(AuthenticationContext);

  // TODO : needs to be replace with the employees login information
  const admin = {
    title:'Dr', 
    name: 'DOE', 
    email:'john.doe.med@ssss.gouv.qc.ca', 
    username: 'JohnDoe', 
    password:'admin'
  };

  const navigate = useNavigate();
  
  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (username === admin.username && password === admin.password)
      setAuthenticated(true);
      navigate('/');
  }

  return (
    <LoginContainer container >
      <Grid container justifyContent='center' alignItems="center">
          <Grid item xs={3} sm={3} md={3}>
            <LoginPaper elevation={3} >
            <Grid container spacing={2} direction='row' justifyContent='center' alignItems="center">
              <Grid item xs={12} sm={12} md={12}><Typography variant="h3" sx={{ color: '#2c387e', marginLeft: 2 }}>{loginText.title}</Typography></Grid>
              <Grid item xs={10} sm={10} md={10}>
                <Input placeholder={loginText.username} id="username" onChange={e => setUserName(e.target.value)} required/>
              </Grid>
              <Grid item xs={10} sm={10} md={10}>
                <Input placeholder={loginText.password} id="password" type="password" onChange={e => setPassword(e.target.value)}/>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Button variant='contained' type="submit" value={loginText.title} onClick={handleLogin}>
                  {loginText.title}
                </Button>
              </Grid>   
              <Grid item xs={9} sm={9} md={9}>{<img src="src/assets/images/chu.png" height='70%' width='70%' />}</Grid>     
            </Grid>
            </LoginPaper>  
          </Grid>
        </Grid>
    </LoginContainer>
  );

} 

export default Login;
