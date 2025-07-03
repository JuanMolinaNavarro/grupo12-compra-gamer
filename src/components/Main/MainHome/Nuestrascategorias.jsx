import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
 * Nuestrascategorias - Componente que muestra las categorías principales
 * 
 * Este componente presenta un grid visual de las categorías más importantes
 * del e-commerce. Cada categoría se muestra como una tarjeta con imagen de fondo
 * y texto superpuesto, funcionando como enlaces directos a las páginas de productos.
 * 
 * Diseño:
 * - Layout responsivo con diferentes tamaños de tarjetas
 * - Imágenes representativas de cada categoría
 * - Enlaces directos a páginas de categoría específicas
 * - Texto superpuesto con buena legibilidad
 */
const Nuestrascategorias = () => {
    return (
        <>
            {/* Título de la sección */}
            <h3 className='text-start mt-3 '>Explora nuestras <strong>Categorias</strong> </h3>
            
            <Row className='d-flex justify-content-center'>
                {/* Tarjeta principal - Procesadores (tamaño completo en móvil, 4 columnas en desktop) */}
                <Col sm={12} md={4}>
                    <Card as={Link} className='mt-4 mb-2 overflow-hidden ' to={"/productos/categoria/2"}>
                        <Card.Img  
                            src="https://hardwareviews.com/wp-content/uploads/2020/04/AMD-Ryzen-4000-APU_1.png" 
                            className="img-fluid cardCategoriasimg cardCategoriasPrincipal" 
                        />
                        <Card.Text className="position-absolute bottom-0 start-50 translate-middle-x text-light fs-4 p-2">
                            <strong>Procesadores</strong>
                        </Card.Text>
                    </Card>
                </Col>
                
                {/* Grid de categorías secundarias (8 columnas en desktop) */}
                <Col sm={12} md={8}>
                    <Row>
                        {/* Notebooks */}
                        <Col xs={6} sm={4} md={4}>
                            <Card as={Link} className='mb-3 overflow-hidden ' to={"/productos/categoria/1"} >
                                <Card.Img  
                                    src="https://th.bing.com/th/id/OIP.EdOB2iu393xqwpqM82E2PgHaHY?rs=1&pid=ImgDetMain&cb=idpwebpc2" 
                                    className="img-fluid cardCategoriasimg" 
                                />
                                <Card.Text className="position-absolute bottom-0 start-50 translate-middle-x text-light fs-5 p-2">
                                   <strong>Notebooks</strong> 
                                </Card.Text>
                            </Card>
                        </Col>
                        
                        {/* Placas de Video */}
                        <Col xs={6} sm={4} md={4}>
                            <Card as={Link} className='mb-3 overflow-hidden ' to={"/productos/categoria/6"} >
                                <Card.Img 
                                    src="https://www.gamerinfo.com.br/wp-content/uploads/2023/03/RTX_3060.jpg" 
                                    className="img-fluid cardCategoriasimg" 
                                />
                                <Card.Text className="position-absolute bottom-0 start-50 translate-middle-x text-light fs-5 p-2">
                                    <strong>Placas de video</strong>
                                </Card.Text>
                            </Card>
                        </Col>
                        
                        {/* Mothers */}
                        <Col xs={6} sm={4} md={4}>
                            <Card as={Link} className='mb-3 overflow-hidden ' to={"/productos/categoria/4"} >
                                <Card.Img 
                                    src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523135_sd.jpg" 
                                    className="img-fluid cardCategoriasimg" 
                                />
                                <Card.Text className="position-absolute bottom-0 start-50 translate-middle-x text-light fs-5 p-2">
                                    <strong>Mothers</strong>
                                </Card.Text>
                            </Card>
                        </Col>
                        
                        {/* Fuentes */}
                        <Col xs={6} sm={4} md={4}>
                            <Card as={Link} className='mb-3 overflow-hidden ' to={"/productos/categoria/16"} >
                                <Card.Img 
                                    src="https://resources.claroshop.com/medios-plazavip/mkt/62d02852c75b6_capa-6jpg.jpg" 
                                    className="img-fluid cardCategoriasimg" 
                                />
                                <Card.Text className="position-absolute bottom-0 start-50 translate-middle-x text-light fs-5 p-2">
                                    <strong>Fuentes</strong>
                                </Card.Text>
                            </Card >
                        </Col>
                        
                        {/* Memorias RAM */}
                        <Col xs={6} sm={4} md={4}>
                            <Card as={Link} className='mb-3 overflow-hidden ' to={"/productos/categoria/8"} >
                                <Card.Img 
                                    src="https://cdnx.jumpseller.com/mpc-store1/image/30746388/Camilo_Gomez_memory_ram_ddr4_ce880f72-a7f1-48c7-9321-a358ce3e5f5b.jpg.jpg?1673200965" 
                                    className="img-fluid cardCategoriasimg" 
                                />
                                <Card.Text className="position-absolute bottom-0 start-50 translate-middle-x text-light fs-5 p-2">
                                    <strong>Memorias Ram</strong>
                                </Card.Text>
                            </Card>
                        </Col>
                        
                        {/* Gabinetes */}
                        <Col xs={6} sm={4} md={4}>
                            <Card as={Link} className='mb-3 overflow-hidden ' to={"/productos/categoria/15"} >
                                <Card.Img 
                                    src="https://storage.prompt-hunt.workers.dev/clhxb6qzm0001k00gvyvqhnxi_1" 
                                    className="img-fluid cardCategoriasimg" 
                                />
                                <Card.Text className="position-absolute bottom-0 start-50 translate-middle-x text-light fs-5 p-2">
                                    <strong>Gabinetes</strong>
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Nuestrascategorias;
