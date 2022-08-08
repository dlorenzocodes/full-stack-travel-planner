import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { addEditedActivity, removeActivity } from '../features/trip/tripSlice'

function ActivityItem({ activityValues, activityIndex, itineraryIndex }) {

    const dispatch = useDispatch()
    const [ formData, setFormData ] = useState({
        activity: activityValues.activity,
        time: activityValues.time
    })
    const { activity, time } = formData


    const handleForm = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleEditActivity = (activityIndex, itineraryIndex) => {
        const rgx = /^[A-Za-z\s]*$/
    
        if(activity === ''){
          toast.error('An activity must be provided. Please enter one!')
          return
        } else if(!rgx.test(activity)){
          toast.error('Activity must only contain letters and spaces!')
          return
        }

        const data = { 
            activityIndex, 
            itineraryIndex,
            formData
        }

        dispatch(addEditedActivity(data))
        toast.info('Activity was edited!')
    }

    const handleRemoveActivity = (activityIndex, itineraryIndex) => {
        if(window.confirm('Are you sure you want to delete this item?')){
            const data = { activityIndex, itineraryIndex }
            dispatch(removeActivity(data))
        }
    }

    return (
        <div className='activity-card' id={activityIndex}>
            <form className='itinerary-form'>
                <fieldset>
                    <input 
                        type='text' 
                        name='activity' 
                        id='activity'
                        value={activity}
                        onChange={handleForm}
                        placeholder='Activity'
                    />
                    <input 
                        type='time' 
                        name='time'
                        id='time'
                        value={time}
                        onChange={handleForm}
                    />
                </fieldset>
                <div className='tooltip'>
                    <PencilAltIcon 
                        fill='#2F2E41' 
                        onClick={() => handleEditActivity(activityIndex, itineraryIndex)}
                    />
                    <span className='tooltipText'>Edit fields first, then click edit icon when editing</span>
                    <TrashIcon 
                        fill='#2F2E41'
                        onClick={() => handleRemoveActivity(activityIndex, itineraryIndex)}
                    />
                </div>
            </form>
        </div>
    )
}

export default ActivityItem