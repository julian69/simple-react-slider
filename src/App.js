import React, { useEffect, useState } from 'react';
import { IoIosPlayCircle } from "react-icons/io";
import { MdPauseCircleFilled, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import './App.scss';

const slides = [
    {
      eachSlide: 'url(https://unsplash.it/1900/1024/?image=497)',
    },
    {
      eachSlide: 'url(https://unsplash.it/1900/1024/?image=291)',
    },
    {
      eachSlide: 'url(https://unsplash.it/1900/1024/?image=786)',
    },
    {
      eachSlide: 'url(https://unsplash.it/1900/1024/?image=768)',
    },
    {
      eachSlide: 'url(https://unsplash.it/1900/1024/?image=726)',
    },
    {
      eachSlide: 'url(https://unsplash.it/1900/1024/?image=821)',
    }
];

const Slider = (props) => {
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(0);
    const max = slides.length;

    const intervalBetweenSlides = () => autoplay && setActive(active === max - 1 ? 0 : active + 1)

    useEffect(() => {
        const interval = setInterval( () => intervalBetweenSlides(), 3000);
        return () => clearInterval(interval);
    });

    const toggleAutoPlay = () => setAutoplay(!autoplay)

    const goToNextSlide = () => active < max - 1 && setActive(active + 1)

    const goToPreviousSlide = () => active > 0 && setActive(active - 1)

    const isSlideActive = value => active === value && 'active'

    const setSliderStyles = () => {
        const transition = active * - 100;
        
        return {
          width: ( slides.length * 100 ) + 'vw',
          transform: 'translateX(' + transition + 'vw)'
        }
    }

    const renderSlides = () => slides.map((item, index) => (
        <div 
            key={ index } 
            className='each-slide' 
            style={{ backgroundImage: item.eachSlide }}>
        </div> 
    ));

    const renderDots = () => slides.map((silde, index) => ( // check index
        <li className={ isSlideActive(index) + ' dots' } key={ index }>
            <button onClick={ () => setActive(index) }>
                <span>&#9679;</span>
            </button>
        </li> 
    ));

    const renderPlayStop = () => autoplay ? <MdPauseCircleFilled size="24" color="#ffffff" /> : <IoIosPlayCircle size="24" color="#ffffff" />

    const renderArrows = () => (
        <React.Fragment>
            <button 
                type='button'
                className='arrows prev' 
                onClick={ () => goToPreviousSlide() } >
                <MdKeyboardArrowLeft size="50" color="#ffffff" />
            </button>
            <button 
                type='button'
                className='arrows next' 
                onClick={ () => goToNextSlide() } > 
                <MdKeyboardArrowRight size="50" color="#ffffff" />
            </button>
        </React.Fragment>
    )

    return (
        <section className='slider'>
            <div className='wrapper' style={ setSliderStyles() }>
                { renderSlides() }
            </div>
            { renderArrows() }
            <ul className='dots-container'>
                { renderDots() }
            </ul>
            <button 
                type='button'
                className='toggle-play' 
                onClick={ toggleAutoPlay }> 
                { renderPlayStop() }
            </button>
        </section>
    );
};

export default Slider;
