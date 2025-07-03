import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

/**
 * Armatupc - Componente Call-to-Action para el configurador de PC
 * 
 * Este componente promociona la funcionalidad de armado de PC personalizada.
 * Presenta una propuesta de valor clara sobre la compatibilidad de componentes
 * y redirige al usuario a la página de configuración.
 * 
 * Funcionalidades:
 * - Navegación programática a la página del configurador
 * - Diseño atractivo con fondo y texto promocional
 * - Call-to-action claro y directo
 */
const Armatupc = () => {
    // Hook para navegación programática
    let navigate = useNavigate();

    /**
     * Maneja el click en el botón para navegar al configurador de PC
     * Redirige al usuario a la ruta "/armarpc"
     */
    const handleckick = () => {
        navigate("/armarpc");
    };

    return (
        <Container className='armatupc pb-2 pt-3 d-flex justify-content-end'>
            <div>
                {/* Título principal del CTA */}
                <h2 className='text-light text-start '>Armá tu PC</h2>
                
                {/* Descripción de la propuesta de valor */}
                <p className='text-light text-start fs-5'>
                    Configurá tu nueva PC <br /> 
                    sin errores de compatibilidad, seleccionando <br /> 
                    todos los componentes que deseás.
                </p>
                
                {/* Botón de acción principal */}
                <div className='d-flex justify-content-start p-1 '>
                    <Button 
                        className='btncolor' 
                        type='click' 
                        onClick={handleckick}
                    >
                        Ver mas
                    </Button>    
                </div>
            </div>
        </Container>
    );
};

export default Armatupc;