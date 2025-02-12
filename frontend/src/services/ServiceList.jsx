import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';
import weatherimg from '../assets/images/weather.png';
import guideimg from '../assets/images/guide.png';
import customizeimg from '../assets/images/customization.png';
const servicesData = [
    {
        imgUrl: weatherimg,
        title: "Occasional Vications",
        desc: "Winter for North, Spring for Culture"
    },
    {
        imgUrl: guideimg,
        title: "Tour Guide",
        desc: " Explore historical Background & Beauty."
    },
    {
        imgUrl: customizeimg,
        title: "Custom Tour",
        desc: "Amazing & Customizable Tours"
    },
    
];

const ServiceList = () => {
    return (
        <>
            {servicesData.map((item, index) => (
                <Col lg='' key={index}>
                    <ServiceCard item={item} />
                </Col>
            ))}
        </>
    );
};

export default ServiceList;
