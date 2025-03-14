import React,{useRef} from 'react'
import './search-bar.css'
import { Col,Form,FormGroup } from "reactstrap"
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/config'
const SearchBar = () => {

    const locationRef=useRef('')
    const distanceRef=useRef('0')
    const maxGroupSizeRef=useRef('0')
    const navigate = useNavigate()
    
    const searchHandler = async () => {
        const location = locationRef.current.value;
        const distance = distanceRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;
    
        // Ensure location is provided
        if (location === '') {
            return alert('Location Field is Required');
        }
    
        // Dynamically construct the query string
        const queryParams = new URLSearchParams();
        queryParams.append('city', location); // Location is required
        if (distance) queryParams.append('distance', distance); // Include only if provided
        if (maxGroupSize) queryParams.append('maxGroupSize', maxGroupSize); // Include only if provided
    
        try {
            const response = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${queryParams.toString()}`);
    
            if (!response.ok) {
                return alert('Something went wrong');
            }
    
            const results = await response.json();
            navigate(`/tours/search?${queryParams.toString()}`, { state: results.data });
        } catch (error) {
            console.error('Error fetching tours:', error);
            alert('An error occurred while searching. Please try again.');
        }
    };
    


  return <Col lg='12'>
    <div className="search__bar">
        <Form className='d-flex align-items-center gap-4'>
         <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i class="ri-map-pin-line"></i></span>
            <div>
                <h6>Location</h6>
                <input type="text" placeholder="Why are you running?" ref={locationRef}/>
            </div>
         </FormGroup>
         <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i class="ri-map-pin-time-line"></i></span>
            <div>
                <h6>Distance</h6>
                <input type="number" placeholder="Distance k/m" ref={distanceRef}/>
            </div>
         </FormGroup>
         <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span><i class="ri-group-line"></i></span>
            <div>
                <h6>Members</h6>
                <input type="number" placeholder="Individuals" ref={maxGroupSizeRef}/>
            </div>
         </FormGroup>
         <span className='search__icon' type='submit' onClick={searchHandler}>
            <i class="ri-search-line"></i></span>
        </Form>
    </div>
  </Col>
}

export default SearchBar
