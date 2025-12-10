import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppBar, Button, Drawer, Toolbar, List, ListItemText, Box, Avatar } from "@mui/material"
import { useAuth } from "../Context";
import logo from "../../public/images/logo.png"

import DensityMediumIcon from '@mui/icons-material/DensityMedium';

function NavBar(){
    //drawer options:
    const [ openDrawer, setOpenDrawer ] = useState<boolean>(false)
    const onClose=()=>setOpenDrawer(false)

    const navTo = useNavigate()
    const context = useAuth()

    return(<>
        <AppBar sx={{position:"sticky"}}>
            <Toolbar>
                <Drawer anchor="left" open={openDrawer} onClose={onClose}>

                    <List sx={{ width: 250, mt:"30px" }}>
                        <Box sx={{padding:"1.5rem"}}>
                            <ListItemText
                                sx={{"&:hover":{backgroundColor:"#babfbb",cursor:"pointer"}}}
                                primary={"Buscar paciente"} 
                                onClick={()=>navTo("/consultregister")}
                            />
                            <ListItemText
                                sx={{"&:hover":{backgroundColor:"#babfbb",cursor:"pointer"}}}
                                primary={"Nuevo registro"} 
                                onClick={()=>navTo("/newregister")}
                            />
                            <ListItemText
                                sx={{"&:hover":{backgroundColor:"#babfbb",cursor:"pointer"}}}
                                primary={"Mi información"} 
                                onClick={()=>navTo("/updatelogin")}
                            />
                        </Box>
                    </List>

                </Drawer>


                <Avatar
                    onClick={()=>navTo("/")}
                    alt="Remy Sharp"
                    src={logo}
                    sx={{
                         width: 50, 
                        height: 50, 
                        marginRight:"30px", 
                        cursor:"pointer", 
                        "&:hover":{scale:1.33333}
                    }}
                    
                />
                {context.auth.access && (
                    <Button 
                        onClick={()=>setOpenDrawer(true)}>
                            <DensityMediumIcon/>
                            Opciones
                    </Button>)}
            </Toolbar>
        </AppBar>
    </>)
}export default NavBar