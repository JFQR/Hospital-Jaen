import { Stack, Box, ButtonGroup, Button } from "@mui/material"

type props = {  onSend: (value: string, field:string) => void, }

function ButtonsScale({onSend}:props){
    return(<Box>
        <Stack>
            <p>Ocular</p>
            <ButtonGroup orientation="vertical">
                <Button onClick={()=>onSend("Espontánea","ocular")}>Espontánea</Button>
                <Button onClick={()=>onSend("Tras orden","ocular")}>Tras orden</Button>
                <Button onClick={()=>onSend("Tras estímulo","ocular")}>Tras estímulo</Button>
                <Button onClick={()=>onSend("Ninguna","ocular")}>Ninguna</Button>
            </ButtonGroup>
        </Stack>
        <Stack>
            <p>Verbal</p>
            <ButtonGroup orientation="vertical">
                <Button onClick={()=>onSend("Orientado","verbal")}>Orientado</Button>
                <Button onClick={()=>onSend("Confuso","verbal")}>Confuso</Button>
                <Button onClick={()=>onSend("Palabras","verbal")}>Palabras</Button>
                <Button onClick={()=>onSend("Sonidos","verbal")}>Sonidos</Button>
                <Button onClick={()=>onSend("Ninguna","verbal")}>Ninguna</Button>
            </ButtonGroup>
        </Stack>
        <Stack>
            <p>Motora</p>
            <ButtonGroup orientation="vertical">
                <Button onClick={()=>onSend("Obedece","motor_response")}>Obedece</Button>
                <Button onClick={()=>onSend("Localiza dolor","motor_response")}>Localiza dolor</Button>
                <Button onClick={()=>onSend("Flexión normal","motor_response")}>Flexión normal</Button>
                <Button onClick={()=>onSend("Flexión anormal","motor_response")}>Flexión anormal</Button>
                <Button onClick={()=>onSend("Extensión anormal","motor_response")}>Extensión anormal</Button>
                <Button onClick={()=>onSend("Ninguna","motor_response")}>Ninguna</Button>
            </ButtonGroup>
        </Stack>
    </Box>)
}export default ButtonsScale