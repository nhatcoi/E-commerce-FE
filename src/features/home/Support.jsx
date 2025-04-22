import { Container, Row, Col } from 'react-bootstrap';
import { supportData } from 'src/data/home/support';
import 'src/styles/component/Home.css';

const Support = () => {
    const { items, layout } = supportData;

    return (
        <div className={layout.containerClass}>
            <Container>
                <Row className="justify-content-center text-center">
                    {items.map((item, index) => (
                        <Col key={index} md={4} className={layout.itemClass}>
                            <div className={layout.iconClass}>
                                <img src={item.imgSrc} alt={item.title} className={layout.imgClass} />
                            </div>
                            <h4 className={layout.titleClass}>{item.title}</h4>
                            <p className={layout.descriptionClass}>{item.description}</p>
                            {index !== items.length - 1 && (
                                <div className="divider d-none d-md-block"></div>
                            )}
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Support;
