import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { themeSettings } from "@/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthentificationContext"
import Routes from "@/Routes"
import axios from "axios"

function App() {

  const baseURL = ""
  const [size, setSize] = useState(0)
  const fetchValues = async () =>{
    const loadData = await axios.get(`${baseURL}/DBsize`);
    setSize(Number.parseFloat(loadData.data).toFixed(1));
  }
  useEffect(()=>{
    fetchValues()
  })

  const [openStorage, setOpenStorage] = useState(false);
  
  const handleOpenStorage = () => {
    setOpenStorage(!openStorage);
  };

  const handleDeletePatientsOut = async () => {
    const deletePO = await axios.get(`${baseURL}/DeleteDischargedPatients`)
  };

  const handleReset = async () => {
    const reset = await axios.get(`${baseURL}/DeleteDB`)
  };

  const [dataPatient, setDataPatient] = useState(null);
  const [token, setToken] = useState(null);
  const [chambre, setChambre] = useState(null);
  const [fenetre, setFenetre] = useState(2);

  const theme = useMemo(() => createTheme(themeSettings), []);
  
  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="0.5rem">
              <AuthProvider>
                <Routes />
              </AuthProvider >
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;

 


  const drawer = (
    <div>
      {token ? <Typography align='center' style={{color: isDark? DARK_THEME.palette.text.secondary : LIGHT_THEME.palette.text.secondary}} variant='h6'>{token.title} {token.name}</Typography>: <></>}
      <Divider/> 
      <List>
        <ListItemButton onClick={handleOpenLanguages}>
          <ListItemIcon>
            <LanguageIcon /> 
          </ListItemIcon>
          <ListItemText primary={appText.langue[lg]} />
          {openLanguages ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openLanguages} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {setLg('fr'); setOpenMenu(false)}}>
            <ListItemIcon>
              <img src={fr} height="15" width="20" alt="rouge" style={{borderRadius:'10%'}}/>
            </ListItemIcon>
            <ListItemText primary={appText.francais[lg]} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {setLg('en'); setOpenMenu(false)}}>
            <ListItemIcon>
              <img src={en} height="15" width="20" alt="rouge" style={{borderRadius:'10%'}}/>
            </ListItemIcon>
            <ListItemText primary={appText.anglais[lg]} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {setLg('sp'); setOpenMenu(false)}}>
          <ListItemIcon>
              <img src={es} height="15" width="20" alt="rouge" style={{borderRadius:'10%'}}/>
            </ListItemIcon>
            <ListItemText primary={appText.espagnol[lg]} />
          </ListItemButton>
        </List>
      </Collapse>

        <ListItemButton>
          <ListItemIcon>
            <AddchartIcon /> 
          </ListItemIcon>
          <ListItemText primary={appText.graph[lg]} onClick={handleOpenCreateGraph}/>
          <Dialog open={openCreateGraph} onClose={handleOpenCreateGraph}>
            <DialogContent sx={{backgroundColor:'white'}}>
              <CreateGraph setOpenCreateGraph={setOpenCreateGraph} lg={lg}/>
            </DialogContent>
          </Dialog>
        </ListItemButton>
        
        <ListItemButton onClick={handleOpenStorage}>
          <ListItemIcon>
            <StorageIcon/> 
          </ListItemIcon>
          <ListItemText primary={appText.db[lg]} />
          {openLanguages ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openStorage} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {handleDeletePatientsOut() ;setOpenMenu(false)}}>
            <ListItemIcon>
              <GroupRemoveIcon/>
            </ListItemIcon>
            <ListItemText primary={appText.pOut[lg]} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {handleReset(); setOpenMenu(false)}}>
            <ListItemIcon>
              <DeleteForeverIcon/>
            </ListItemIcon>
            <ListItemText primary={appText.reset[lg]} />
          <Typography> ({size} Mo)</Typography>
          </ListItemButton>
        </List>
      </Collapse>
      
        <ListItemButton>
          <ListItemIcon>
            <HotelIcon/>
          </ListItemIcon>
          <ListItemText primary={appText.patient[lg]} onClick={() => {setChambre(null);}} />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon/>
          </ListItemIcon>
          <ListItemText primary={appText.deconnexion[lg]} onClick={() => {setToken(null); setChambre(null); }} />
        </ListItemButton>
      </List>
    </div>
  );
  
  const Accueil = styled(Paper)(() => ({
    backgroundColor: isDark? DARK_THEME.palette.primary.main : LIGHT_THEME.palette.primary.main
  }));

const Header = (
  <div>
    <Grid container columns={20} >
      <Grid item xs={15} sm={15} md={15}>
        <Typography variant='h6' style={{textAlign:'right'}}>{appText.titre[lg]}</Typography>
      </Grid>
      <Grid item xs={3} sm={3} md={3} justifyContent='flex-end' container>
        <FormGroup>
          <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} checked={isDark} onChange={toggleTheme}/>}/> 
        </FormGroup>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenMenu}
            sx={{ mr: 2 }}
          >
          <MenuIcon />
          </IconButton>
          <Modal hideBackdrop disableEnforceFocus={true} style={styles.modal} open={openMenu} onClose={handleOpenMenu}>
            {drawer}
          </Modal>          
      </Grid>
    </Grid>
  </div>
  );
  return (
    <div>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet"></link>
      { <Router>
        {      
        token ? (chambre ? <div>{Header}</div> : <Main setDataPatient={setDataPatient} setChambre={setChambre} lg={lg}/>) : <Login setToken={setToken} lg={lg}/>
        }
          <Routes>
            <Route path="/" exact element={<Accueil/>}/>
            <Route path="/New" exact element={<NouveauGraph setOpenMenu={setOpenMenu} dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/Main" exact element={<Main setChambre={setChambre} setDataPatient={setDataPatient} lg={lg}/>}/>
            <Route path="/Plan" exact element={<Plan dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/EOI" exact element={<EOI dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/EPF" exact element={<EPF dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/SPO" exact element={<SPO dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/PMOY" exact element={<PMOY dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/FIO" exact element={<FIO dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/VT" exact element={<VT dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/PH" exact element={<PH dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/>
            <Route path="/Bilan" exact element={<Bilan dataPatient={dataPatient} fenetre={fenetre} setFenetre={setFenetre} lg={lg}/>}/> 
          </Routes>
        </Router> }
    <div style={{float:'right'}}><br/><Typography variant='body2'>Version 02/13/2023</Typography></div>
    </div>
    
  );
}
export default App;