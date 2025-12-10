import { Slider } from "@mui/material"
import { GroupContainer } from "../utils/utils"
import NumberSnipper from "../Complex components/NumberSnipper"
import type { toParent } from "../utils/utils"

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Hemodynamics({sendToParent}:toParent){
    return(<GroupContainer>
        <h2 style={{marginLeft:"70px",gap:"8px",display: "flex", alignItems: "center"}}>
            Hemodinámicos
            <FavoriteBorderIcon/>
        </h2>
        <p>Gasto cardícao</p>
        <Slider
            valueLabelDisplay="on"
            min={8}
            max={25}
            onChangeCommitted={(e, value) =>sendToParent(value,"cardiac_output")}
        />
        
        <p>Presión venosa central</p>
        <Slider 
            valueLabelDisplay="on"
            min={2} 
            max={8}
            onChangeCommitted={(e, value) =>sendToParent(value,"cvp")}
        />
        
        <p>Índice de perfusión</p>
        <NumberSnipper
            min={0.2} max={10} 
            field={"perfution"} 
            startNumber={0.2}
            onSend={sendToParent}
        />

        <p>Presión arterial media</p>
        <Slider 
            valueLabelDisplay="on"
            min={65} 
            max={100}
            onChangeCommitted={(e, value) =>sendToParent(value,"_map")}
        />

        <p>Hemoglobina</p>
        <NumberSnipper
            min={9} max={19} 
            field={"hemoglobin"} 
            startNumber={9}
            onSend={sendToParent}
        />
        <p>Hematocrito</p>
        <Slider 
            valueLabelDisplay="on"
            min={9} 
            max={19}
            onChangeCommitted={(e, value) =>sendToParent(value,"hemotocrit")}
        />
    </GroupContainer>)
}export default Hemodynamics