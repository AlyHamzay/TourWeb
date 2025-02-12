import React from 'react'
import TourCard from '../../shared/TourCard'
import { Col } from 'reactstrap'
import UseFetch from '../../hooks/useFetch.js'
import {BASE_URL} from '../../utils/config.js'

const FeaturedTourList = () => {
  const { data: featuredTours,loading,error }= UseFetch(
    `${BASE_URL}/tours/search/getFeaturedTour`
          
  );
  return (<>
  
  {
    loading && <h2>Loading...</h2>
  }
  {
    error && <h2>{error}</h2>
  }
    {!loading && !error && featuredTours?.map(tour=>(
        <Col key={tour.id}  lg="3" className="mb-4">
        
          <TourCard tour={tour}/>
        </Col>

    ))}
  
  </>
);
}

export default FeaturedTourList
