import React from "react";
import { Input, Label } from "nav-frontend-skjema";

interface RadNrProps {
  nr: number
}

const RadNr = ({ nr } : RadNrProps) => {
  return (
    <div className="skjemaelement radnr">
      <Label htmlFor={"nr"}>Rad</Label>
      <div id={"nr"} className="radnr__value">{nr}</div>
    </div>
  )
}

export default RadNr
