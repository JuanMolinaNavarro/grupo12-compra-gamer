import React from 'react'

const Titulo = ({ producto }) => {
    return (
        <div className='containerDestacados'>
            <h4 style={{ fontWeight: '600' }}>{producto}</h4>
            <hr style={{ borderColor: 'black' }} />
        </div>
    )
}

export default Titulo