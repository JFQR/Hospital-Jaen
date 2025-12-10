import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type props={
  min:number, 
  max:number,
  field:string,
  onSend: (value: number, field:string) => void,
  startNumber:number
}

function NumberSnipper({min,max, field, onSend, startNumber}:props) {
  
  const [number, setNumber] = useState<number>(startNumber);

  useEffect(()=>{setNumber(startNumber)},[startNumber])

  function increment(){
    setNumber(prev => {
      const next = Math.min(prev + 1, max)
      onSend(next, field);
      return next;
    });
  }

  function decreese(){
    setNumber(prev => {
      const next = Math.max(prev - 1, min)
      onSend(next, field);
      return next;
    });
  }


  return (<Box
    sx={{
      width:"300px",
      height:"50px",
      display:"flex",
      direction:"row"
    }}
  >
    <Button onClick={increment}>+</Button>
    <Box sx={{width:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
      {number}
    </Box>
    <Button onClick={decreese}>-</Button>
  </Box>);
}
export default NumberSnipper