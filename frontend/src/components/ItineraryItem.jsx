import { v4 as uuidv4 } from 'uuid';
import useDate from '../hooks/useDate'
import ActivityItem from './ActivityItem';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { TrashIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { addActivityToItinerary } from '../features/trip/tripSlice'

function ItineraryItem() {

  const dispatch = useDispatch()
  const { Itinerary } = useSelector( state => state.trip )
  const [ isClicked, setIsClicked ] = useState('')
  const [ formData, setFormData ] = useState({
    activity: '',
    time: ''
  })
  const { activity, time } = formData
  const { formatDate } = useDate()


  useEffect(() => {
    if(Itinerary.length !== 0){
      let stateObj = {}
      for (let i = 0; i < Itinerary.length; i++){
        stateObj[i] = false
      }
      setIsClicked(stateObj)
    }
  }, [Itinerary.length])

  const showCardContent = (e, index) => {
    const parent = e.target.parentNode.parentNode.parentNode
    if(parent.id === index.toString()){
      console.log(parent.id)
      setIsClicked((prevState) => ({
        ...prevState,
        [parent.id]: !prevState[parent.id]
      }))
    }
  }

  const handleActivityForm = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const addActivity = (index) => {
    const activityData = { activity, time, index }
    dispatch(addActivityToItinerary(activityData))
  }

  return (
    <section className='itinerary-items'>
      {Itinerary.length === 0 
        ? '' 
        : <>
          {Itinerary.map( (item, index) => (
            <div 
              key={uuidv4()} 
              className={ isClicked[index] ? 'itinerary-card slide': 'itinerary-card'} 
              id={index}
            >
              <div className='card-header'>
                <h2>{formatDate(item.date)}</h2>
                <div>
                  <TrashIcon fill='#2F2E41'/>
                  <ChevronUpIcon 
                    fill='#2F2E41'
                    onClick={(e) => showCardContent(e, index)}
                  />
                </div>
              </div>
              <div 
                className={ isClicked[index] ? 'card-content show' : 'card-content'}
                >
                <div className='activities'>
                  { 
                    Itinerary[index].activities.length > 0 ?
                    Itinerary[index].activities.map( (activity, index) => (
                      <ActivityItem 
                        key={uuidv4()} 
                        activityValues={activity} 
                        index={index}
                      />
                    )) : ''
                  }
                </div>
                <form>
                  <fieldset>
                    <input 
                      type='text' 
                      name='activity' 
                      autoFocus="autoFocus"
                      id='activity'
                      value={activity}
                      onChange={handleActivityForm}
                      placeholder='Activity'
                    />
                    <input 
                      type='time' 
                      id='time'
                      value={time}
                      onChange={handleActivityForm}
                    />
                    <button type='button'>
                      <PlusCircleIcon 
                        fill='#F88747'
                        onClick={() => addActivity(index)}
                      />
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          ))}
        </>
      }
    </section>
  )
}

export default ItineraryItem