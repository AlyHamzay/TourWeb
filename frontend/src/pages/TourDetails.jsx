import React, { useEffect, useRef, useState,useContext } from "react";
import "../styles/tour-details.css";
import { Container, Col, Row, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CalAvgRating from "../utils/AvgRating";
import Avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const {user}=useContext(AuthContext)
  const options = { day: "numeric", month: "long", year: "numeric" };

  

  //abstract data hm baad mn isme data call kraege API DB se
  const { data: tour,loading,error} = useFetch(`${BASE_URL}/tours/${id}`);
  //destructure properties from tour object
  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    distance,
    maxGroupSize,
    address,
  } = tour;
  //review submit request to server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
      
      try {
        if(!user || user===undefined || user===null){
          alert("Please login to review a tour.")
        }
        const reviewObj={
          username:user?.username,
          reviewText, 
          rating:tourRating
        }
        const res=await fetch(`${BASE_URL}/review/${id}`,{
          method :'post',
          headers :{
            'Content-type':'application/json'
          },
          credentials:'include',
          body:JSON.stringify(reviewObj)

        })
        const result=await res.json()
       if(!res.ok) {
        return alert(result.message)
       }
       alert(result.message)
        
      } catch (err) {
        alert(err.message)
      } 
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[tour])
  const { totalRating, avgRating } = CalAvgRating(reviews);

  return (
    <>
      <section>
        <Container>
          {
            loading && <h4 className="text-center pt-5">Loading....</h4>
          }
          {
            error && <h4 className="text-center pt-5">{error}</h4>
          }
         { !loading && !error && <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />
                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__ratings d-flex align-items-center gap-1">
                      <i
                        className="ri-star-s-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? "Not Rated" : avgRating}
                      {totalRating === 0 ? null : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>
                    <span>
                      <i className="ri-map-pin-user-fill"></i>
                      {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i>
                      {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i>${price}
                      /Person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i>
                      {distance} k/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i>
                      {maxGroupSize} People
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                {/* =======tour review sect========= */}
                <div className="tour__reviews mt-4">
                  {/* <h4>Reviews({reviews.length} reviews)</h4> */}
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1<i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2<i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3<i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4<i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5<i class="ri-star-s-fill"></i>
                      </span>
                    </div>
                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="share your thoughts"
                        required
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {reviews?.map((reviews) => (
                      <div className="review__item">
                        <img src={Avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{reviews.username}</h5>
                              <p>
                                {new Date(reviews.createdAt).toDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center ">
                              {reviews.rating}<i class="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{reviews.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
