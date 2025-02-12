import React from 'react'
import '../styles/home.css'
import Subtitle from '../shared/Subtitle'
import {Container, Row,Col} from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceimg from '../assets/images/experience.png'
import SearchBar from '../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonials/Testimonials'
import Newsletter from '../shared/Newsletter'
const Home = () => {
  return<>
  {/* ====hero section start=== */}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
        <div className='hero__content'>
        <div className="hero__subtitle d-flex align-items-center">
          <Subtitle subtitle={'Plan. Explore. Cherish.'}/>
          <img src={worldImg} alt="" />
        </div>
        <h1> Discover the Wonders of Your Homeland<span className="" > </span> </h1>
        <p>From the majestic peaks of the Karakoram to the golden sands of Gwadar, Pakistan offers unparalleled beauty and adventure. Immerse yourself in the rich culture, vibrant traditions, and breathtaking landscapes that make our country a traveler’s dream.
         </p>
         <span className='services__2subtitle'>"Hum chalein ge saath, raahon mein rang bharne;
         Safar mein jo bhi mile, saathi banate chalo." <br />~Faiz</span>
        </div>
        </Col>
        <Col lg='2'>
          <div className="hero__img-box mt-5">
            <img src={heroImg} alt="" />
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero__img-box mt-4">
            <video src={heroVideo} alt="" controls/>
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero__img-box ">
            <img src={heroImg02} alt="" />
          </div>
        </Col>
        <SearchBar/>
      </Row>
    </Container>
  </section>
<section>
  <Container>
    <Row>'
      <Col lg='3'>
      <h5 className="servives__subtitle">What we Serve</h5>
      <h2 className='services__title'>We offer our best servises</h2>
      </Col>
      <ServiceList/>
    </Row>
  </Container>
  </section>
  {/* ==========Featured Section Start============ */}
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
          <Subtitle subtitle={"Explore"}/>
            <h2 className="featured__tour-title">Featured TOURS</h2>
          </Col>
          <FeaturedTourList/>
        </Row>
      </Container>
    </section>
  {/* ==========Featured Section End============ */}

  {/* =========Experience Section ===== */}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
        <div className="experience__content">
          <Subtitle subtitle={'Experience'}/>
          <h2> With our unmatched expertise, <br />We redefine travel experiences.</h2>
          <p>Over the years, we’ve helped thousands of travelers discover the beauty of Pakistan and beyond. <br />
          Our commitment to excellence has earned us the trust of countless clients and<br />    a reputation for delivering unforgettable journeys. </p>
       
        </div>

        <div className="counter__wrapper d-flex align-items-center gap-5">
          <div className="counter__box">
            <span>12k+</span>
            <h6>Successfull Trips</h6>

          </div>
          <div className="counter__box">
            <span className=''>2k+</span>
            <h6>Regular Clients</h6>

          </div>
          <div className="counter__box">
            <span>7</span>
            <h6>Years Experience</h6>

          </div>
        </div>
        </Col>
        <Col lg="6">
  <div className="experience__img">
    <img
      src={experienceimg}
      alt="Experience"
      style={{
        borderRadius: '30px', // Adjust the radius as needed
        width: '80%',
        height: 'auto',
        objectFit: 'cover'
      }}
    />
  </div>
</Col>
      </Row>
    </Container>
  </section>
{/* =========Experience Section END ===== */}

  {/* ======Gallery Start====== */}
  <section>
  <Container>
    <Row>
    <Col lg="12">
      <Subtitle subtitle={"Gallery"}/>
      <h2 className='gallery_title'>visit our customers gallery</h2>
      </Col>
      <Col lg='12'>
      <MasonryImagesGallery/>
      </Col>
    </Row>
  </Container>
  </section>
{/* ======Gallery End====== */}

  <section>
    <Container>
      <Row>
        <Col lg='12'>
        <Subtitle subtitle={"Fans Love"}/>
        <h2 className='testimonials_title'>What our customers say</h2>
        </Col>
        <Col lg='12'>
        <Testimonials/>
        </Col>
      </Row>
    </Container>
  </section>
  {/* ======Testimonials Start====== */}
  <Newsletter/>



    </>
  
}

export default Home
        