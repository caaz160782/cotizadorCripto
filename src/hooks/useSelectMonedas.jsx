/* eslint-disable react-refresh/only-export-components */

import styled from "@emotion/styled"

const Label =styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select =styled.select`
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`
const useSelectMonedas = (label,opciones) => {
   
    const SelectMonedas = () =>(
     <>
        <Label> {label} </Label>
        <Select>
          <option value="" >Selecciona Moneda</option> 
        {
         opciones.map (opcion => (
            <option
                key={opcion.id}
                value={opcion.id}
            >
                {opcion.nombre}
            </option>
         ))   
        }
        </Select>
     </>
    )

   return [SelectMonedas]
}

export default useSelectMonedas
