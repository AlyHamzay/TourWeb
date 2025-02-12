
import { Card,CardBody } from 'reactstrap'
import{Link} from 'react-router-dom'
import './tour-card.css'
import React from 'react'
import { FiMapPin } from "react-icons/fi";
import TourDetails from '../pages/TourDetails';
import CalAvgRating from '../utils/AvgRating';
const TourCard = ({tour}) => {
        const {_id,title,photo,city,price,featured,reviews}=tour

const {totalRating,avgRating}= CalAvgRating(reviews)        

  return (
    <div className='tour__card'>
        <Card>
            <div className='tour__img'>
                <img src={photo} alt="tour-img" />
               { featured && <span>Featured</span>}
            </div>

            <CardBody>
            <div className='card__top d-flex  align-items-center justify-content-between'>
            </div>
                <span className='tour__location d-flex align-items-center gap-1'>
                <FiMapPin />

                    <i  className='tour__location' class="ri-star-pin-line"></i>{city}

                </span>
                <span className="tour__ratings d-flex align-items-center gap-1">
                    <i className="ri-star-s-fill"></i>{avgRating === 0 ? "Not Rated" : avgRating} 
                    {totalRating === 0 ? null : <span>({reviews.length})</span>}
                </span>
                <h5 className="tour__title"><Link to={`/tour/${_id}`}>{title}</Link></h5>
                <div className="card__bottom align-items-center justify-content-between mt-3 d-flex">
                        <h5>${price}<span>/per person</span></h5>
                        <button className="btn booking__btn">
                        <Link to={`/tour/${_id}`}>Book now</Link>


                        </button>

                </div>

        </CardBody>
        </Card>


    </div>
  )
}

export default TourCard
