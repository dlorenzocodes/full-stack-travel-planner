import React from 'react'
import Arrows from './Arrows'
import Spinner from './Spinner'
import CityItem from './CityItem'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import useCounter from '../hooks/useCounter'
import AttractionItem from './AttractionItem'
import { useSelector, useDispatch } from 'react-redux'
import { getCityRecomendations } from '../features/recomendations/recomendationSlice.js'


function Suggestions() {

  const [citySlide, setCitySlide] = useState(0)
  const [attrSlide, setAttrSlide] = useState(0)
  
  const dispatch = useDispatch()

  const { 
    cityCounter, 
    attractionCounter, 
    attractionTrackCounter, 
    cityTrackCounter } = useCounter()

  const { 
    isLoading,
    cities, 
    attractions 
  } = useSelector( state => state.recomendation )
  

  let cityStyle = {
    transform: `translateX(-${citySlide}%)`,
  }

  let attrStyle = {
    transform: `translateX(-${attrSlide}%)`,
  }

  useEffect(() => {
    dispatch(getCityRecomendations())
  }, [dispatch])

  useEffect(() => {
    const slideNumber = cityCounter * 100
    setCitySlide(slideNumber)
  },[cityCounter])

  useEffect(() => {
    const slideNumber = attractionCounter * 100
    setAttrSlide(slideNumber)
  },[attractionCounter])


  const citySlideRight = () => cityTrackCounter('right')
  const citySlideLeft = () => cityTrackCounter('left')

  const attrSlideRight = () => attractionTrackCounter('right')
  const attrSlideLeft = () => attractionTrackCounter('left')


  if(isLoading) return <Spinner />

  if(cities === null) return <p> Suggestions can't be provided at this time</p>

  return (
    <section className='suggestions-container section-padding'>

      <div className='suggestions-results' id='cities'>
        <h3 className='section-heading'>Planning your next trip?</h3>
        <p className='subheading-text'>Here are some suggestions</p>

        <div className='carousel'>
          {cities.geonames.map((city) => (
            <CityItem 
              city={city} 
              key={uuidv4()} 
              style={cityStyle}
            />
          ))}
        </div>
        
        <Arrows slideLeft={citySlideLeft} slideRight={citySlideRight} />
      </div>

      <div className='suggestions-results attractions' id='attractions'>
        <h3 className='section-heading'>Attractions</h3>

        { attractions.length !== 0 ?
          (
            <div className='carousel'>
              { attractions.map((place) => (
                <AttractionItem place={place} key={uuidv4()} style={attrStyle} />
              ))}
            </div>
          ) : (
            <p>Suggestions can't be provided at this time</p>
          )
        }      

         <Arrows slideLeft={attrSlideLeft} slideRight={attrSlideRight} /> 

      </div>
    </section>
  )
}

export default Suggestions