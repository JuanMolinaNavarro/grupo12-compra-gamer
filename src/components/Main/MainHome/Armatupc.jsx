import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



const Armatupc = () => {

    let navigate = useNavigate()

    const handleckick = ()=>{
        
        navigate("/armarpc")
    }


  return (
    <Container className='armatupc pb-2 pt-3 d-flex justify-content-end'>
        <div>
            <h2 className='text-light text-start '>Armá tu PC</h2>
            <p className='text-light text-start fs-5'>Configurá tu nueva PC <br /> sin errores de compatibilidad,  seleccionando <br /> todos los componentes que deseás.</p>
            <div className='d-flex justify-content-start p-1 '>
            <Button className='btncolor'  type='click' onClick={handleckick}>Ver mas</Button>    
            </div>
        </div>
    </Container>
  )
}

export default Armatupc