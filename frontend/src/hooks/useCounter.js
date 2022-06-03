import { useState } from 'react'

export default function useCounter() {

    const [cityCounter, setCityCounter] = useState(0)
    const [attractionCounter, setAttractionCounter] = useState(0)
    const numberOfIncrements = 2

    const cityTrackCounter = (direction) => {
        if(cityCounter < numberOfIncrements && direction === 'right'){
            setCityCounter(prevState => prevState + 1 )
        }
        if(cityCounter > 0 && direction === 'left'){
            setCityCounter(prevState => prevState - 1)
        }
    }

    const attractionTrackCounter = (direction) => {
        if(attractionCounter < numberOfIncrements && direction === 'right'){
            setAttractionCounter(prevState => prevState + 1 )
        }
        if(attractionCounter > 0 && direction === 'left'){
            setAttractionCounter(prevState => prevState - 1)
        }
    }

    return { 
        cityCounter, 
        attractionCounter, 
        cityTrackCounter,
        attractionTrackCounter
    }
}
