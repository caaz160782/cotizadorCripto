import { useState,useEffect } from 'react'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;  
  @media (min-width: 1024px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);   
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width:300px;  
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`
const Heading = styled.h1`
  font-family: 'lato',  sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin:10px auto 0 auto;
  }
`

function App() {

  const [monedas ,setMonedas]=useState({});
  const [cotizacion ,setCotizacion]=useState({});
  const [cargando ,setCargando]=useState(false);

  const consultarCripto= async (monedas)=>{

    setCargando(true)
    setCotizacion({});
    const {moneda, criptoMoneda}= monedas;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;    
    const respuesta = await fetch(url);
    const result = await respuesta.json()
    setCotizacion(result.DISPLAY[criptoMoneda][moneda])       
    setCargando(false)
   }
 

  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      consultarCripto(monedas);
    }


  },[monedas])
    

   return (
    <Contenedor>
       
       <Imagen
        src={ImagenCripto}
        alt="imagen cripto"
       /> 

       <div>
       <Heading>  Cotiza CriptoMonedas al Instante </Heading>
       <Formulario
         setMonedas={setMonedas}
       />
       {cargando && <Spinner/> }
       { cotizacion?.PRICE && <Resultado cotizacion={cotizacion}/> }
       </div>
    </Contenedor>      
  )
}

export default App
