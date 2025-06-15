
import { Carousel} from 'react-bootstrap';

const Carrusel = () => {
  return (
    
     <Carousel>
        
      <Carousel.Item className='carruselcap'> 
        <img  className='img-fluid bordeImg m-auto' src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250530111733_CFt1U2v1.jpg" alt="Imagen Promocion" />
      </Carousel.Item>
      <Carousel.Item className='carruselcap'>
        <img  className='img-fluid bordeImg' src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250526153905_n8Lxf4z0.jpg" alt="Imagen Promocion" />
      </Carousel.Item>
      <Carousel.Item>
        <img  className='img-fluid bordeImg' src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250520114842_QG3k4gzP.jpg" alt="Imagen Promocion" />
      </Carousel.Item>
      <Carousel.Item>
        <img  className='img-fluid bordeImg' src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250528162545_9IvJodRT.jpg" alt="Imagen Promocion" />
      </Carousel.Item>
      <Carousel.Item>
        <img  className='img-fluid bordeImg' src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250609154356_MSLAamcS.jpg" alt="Imagen Promocion" />
      </Carousel.Item>  
    </Carousel>
  )
}

export default Carrusel