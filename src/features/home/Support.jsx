import { Container, Row, Col } from 'react-bootstrap';
import 'src/styles/component/Home.css';
import support1 from 'src/assets/img/support-area/support-1.png';
import support2 from 'src/assets/img/support-area/support-2.png';
import support3 from 'src/assets/img/support-area/support-3.png';

const supportData = [
    {
        imgSrc: support1,
        title: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed',
    },
    {
        imgSrc: support2,
        title: 'SupportPage 24/7',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed',
    },
    {
        imgSrc: support3,
        title: 'Money Return',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed',
    },
];

const Support = () => {
    return (
        <div className="support-area">
            <Container>
                <Row className="justify-content-center text-center">
                    {supportData.map((item, index) => (
                        <Col key={index} md={4} className="support-item d-flex flex-column align-items-center">
                            <div className="support-icon">
                                <img src={item.imgSrc} alt={item.title} className="support-icon-img" />
                            </div>
                            <h4 className="support-title mt-3">{item.title}</h4>
                            <p className="support-description">{item.description}</p>
                            {index !== supportData.length - 1 && (
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
