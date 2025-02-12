import React from "react";
import Slider from "react-slick";
import Ava01 from "../../assets/images/ava-1.jpg";
import Ava02 from "../../assets/images/ava-2.jpg";
import Ava03 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    swipeToSlide: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          "Sung Yaar Travel ne humein Hunza ki trip pe behtareen service di. Har cheez time par aur professional thi!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={Ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Ali Khan</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          "It was an amazing experience traveling with Sung Yaar Travel. Their team is very supportive and professional."
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={Ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Ayesha Ahmed</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          "Main aur meri family ne Swat valley ki trip ki thi. Sung Yaar ki planning bohot zabardast thi. Highly recommended!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={Ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Fatima Rizwan</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          "Jo log Pakistan ki khubsurti explore karna chahte hain, unke liye Sung Yaar Travel ek perfect choice hai!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={Ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Hamza Tariq</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
