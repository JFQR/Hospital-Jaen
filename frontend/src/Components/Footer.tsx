import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import  {useState} from 'react'
function Footer() {
  const[ openAbout, setOpenAbout ]= useState<boolean>(false)
  const[ openContact, setOpenContact ]= useState<boolean>(false)
  return (<>
    <Box
      sx={{
        mt: 4,        
        py: 3,           
        px: 2,             
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body1">
        © 2025 Hospital Jaén
      </Typography>
      <Typography variant="body2">
        <a onClick={()=>setOpenAbout(true)} color="inherit">
          Acerca de
        </a>{" "}
        |{" "}
        <a onClick={()=>setOpenContact(true)} color="inherit">
          Contacto
        </a>
      </Typography>
    </Box>

      <Dialog open={openAbout} onClose={() => setOpenAbout(false)}>
        <DialogTitle>Acerca del Hospital Jaén</DialogTitle>

        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            El Hospital Jaén es una institución médica comprometida con la
            atención integral, humanista y de calidad para nuestros pacientes.
          </Typography>

          <Typography variant="body1">
            Nuestro equipo está conformado por profesionales altamente
            capacitados que trabajan cada día para brindar servicios de salud
            con excelencia, seguridad y trato digno.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAbout(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openContact} onClose={() => setOpenContact(false)}>
        <DialogTitle>Contacto</DialogTitle>

        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            📍 Dirección: Av. Central #123, Jaén
          </Typography>

          <Typography variant="body1" gutterBottom>
            ☎ Teléfono: (01) 555-1234
          </Typography>

          <Typography variant="body1" gutterBottom>
            📧 Correo: contacto@hospitaljaen.com
          </Typography>

          <Typography variant="body2">
            Nuestro horario de atención es de lunes a sábado de 7:00 a 20:00.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenContact(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
</>)}export default Footer
