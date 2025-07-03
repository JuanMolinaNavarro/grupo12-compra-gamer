import { Carousel } from "react-bootstrap";

/**
 * Carrusel - Componente de banner promocional rotativo
 * 
 * Este componente muestra un carrusel de imágenes promocionales en la página principal.
 * Utiliza React Bootstrap para crear un slideshow automático que destaca ofertas
 * especiales, productos nuevos o campañas de marketing.
 * 
 * Las imágenes se cargan desde URLs externas y deben estar optimizadas para
 * diferentes tamaños de pantalla mediante las clases CSS aplicadas.
 */
const Carrusel = () => {
  return (
    <Carousel className="mb-3 mt-5 pb-5">
      {/* Primer slide promocional */}
      <Carousel.Item className="carruselcap ">
        <img
          className="img-fluid"
          src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250530111733_CFt1U2v1.jpg"
          alt="Imagen Promocion"
        />
      </Carousel.Item>
      
      {/* Segundo slide promocional */}
      <Carousel.Item className="carruselcap">
        <img
          className="img-fluid"
          src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250526153905_n8Lxf4z0.jpg"
          alt="Imagen Promocion"
        />
      </Carousel.Item>
      
      {/* Tercer slide promocional */}
      <Carousel.Item>
        <img
          className="img-fluid"
          src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250520114842_QG3k4gzP.jpg"
          alt="Imagen Promocion"
        />
      </Carousel.Item>
      
      {/* Cuarto slide promocional */}
      <Carousel.Item>
        <img
          className="img-fluid"
          src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250528162545_9IvJodRT.jpg"
          alt="Imagen Promocion"
        />
      </Carousel.Item>
      
      {/* Quinto slide promocional */}
      <Carousel.Item>
        <img
          className="img-fluid "
          src="https://imagenes.compragamer.com/bannerPrincipal/DC_20250609154356_MSLAamcS.jpg"
          alt="Imagen Promocion"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carrusel;
