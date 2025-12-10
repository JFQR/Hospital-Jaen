import { styled } from '@mui/material/styles'
import { Box } from "@mui/material"
//materia ui boxes to group the different types of vital signs vissually
export const GroupContainer = styled(Box)({
    display:"flex",
    flexDirection: "column",
    gap:"16px",
    padding:"2rem",
    justifyContent:"center",
    maxWidth:"400px",
    border: "2px solid #b53f4e",
})
//the type for the function that's going to send data to newRegistre
export type toParent={
    sendToParent: (value: number|string, field:string) => void
}
//the types and fields that Django will recieve of a register
export type register = {
    fk_doctor:number|null,
    date:string|null,
    patient_name:string|null,
    control_number:string|null,
    heartbeat:number|null,
    pas:string|null,
    pad:string|null,
    breathbeat:number|null,
    corporalTemp:number|null,
    pain:number|null,
    ocular:null|string,
    verbal:null|string,
    motor_response:null|string,
    skin_colour:null|string,
    trugidity:null|string,
    cardiac_output:null|number,
    cvp:null|number,
    perfution:null|number,
    _map:null|number,
    hemoglobin:string|null,
    hemotocrit:null|number,
    pupilary:null|string,
    muscle_tone:null|number,
    posture:null|string,
    bmi:null|number,
    urinary_flow:null|number,
    arterial_oxigen:null|number,
    cranial_pressure:null|number,
}
//the datePicker component gives dates in an inconvinient format
//thus the needed formating
   export  function formatDate(date:any){
        let year:string = date.$y.toString()
        let month:string = date.$M+1
        let stringMonth = month.toString()
        let day:string = date.$D.toString()
        const myDate:string = `${year}-${stringMonth}-${day}`
        return myDate
    }