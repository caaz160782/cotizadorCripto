/* eslint-disable react/prop-types */

import { useState,useEffect } from 'react'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import styled from '@emotion/styled'
import { monedas } from '../data/monedas'

const InputSubmit =styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
           background-color:#7A7DFE ;
           cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

  const[criptos, setCriptos]=useState([]);
  const[error, setError]    =useState(false);
  const[ moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
  const[ criptoMoneda, SelectCriptoMonedas] = useSelectMonedas('Elige tu CriptoMoneda',criptos);

  
  const consultarAPI= async ()=>{
    const url = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
    const respuesta = await fetch(url);
    const result = await respuesta.json()
    
   const arrayCriptos = result.Data.map( cripto =>{
      const objeto= {
            id: cripto.CoinInfo.Name,
        nombre: cripto.CoinInfo.FullName
       }

       return objeto
   })
   setCriptos(arrayCriptos);
   }

  useEffect(()=>{
    consultarAPI();
  },[])
  
  const handleSubmit=(e)=>{
    e.preventDefault();

    if([moneda,criptoMoneda].includes('')){
      setError(true)
      return
    }
    setError(false)
    setMonedas({moneda,criptoMoneda})
  }

   return (
    <>
    { error && <Error> TODOS LOS CAMPOS SON OBLIGATORIOS</Error>}
    <form
      onSubmit={handleSubmit}
    >
       <SelectMonedas/>

       <SelectCriptoMonedas/>

       <InputSubmit
          type="submit" 
          value="Cotizar"/>
    </form>
    </>
  )
}

export default Formulario
