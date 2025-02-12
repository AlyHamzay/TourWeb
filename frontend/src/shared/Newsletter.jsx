import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MT from '../assets/images/male-tourist.png'
import './newsletter.css'

const Newsletter = () => {
  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>
              "Subscribe now to stay updated with our latest and exclusive travel packages."
              Be the first to know about new deals, destinations, and offers straight to your inbox.
              </p>
            </div>
          </Col>
          <Col lg="6">
                <div className="newsletter__img">

                    <img src={MT} alt="" />

                </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
