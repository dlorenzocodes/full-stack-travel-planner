import { useState } from 'react'
import useTime from '../hooks/useTime'
import { useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { addEditedActivity, removeActivity } from '../features/trip/tripSlice'

function ActivityItem({ activityValues, activityIndex, itineraryIndex }) {

    const dispatch = useDispatch()
    const { formatTime } = useTime()
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
        const data = { 
            activityIndex, 
            itineraryIndex,
            formData
        }
        dispatch(addEditedActivity(data))
    }

    const handleRemoveActivity = (activityIndex, itineraryIndex) => {
        const data = { activityIndex, itineraryIndex }
        dispatch(removeActivity(data))
    }

    return (
        <div className='activity-card' id={activityIndex}>
            <form>
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
                        type='timeEdit' 
                        id='timeEdit'
                        value={formatTime(time)}
                        onChange={handleForm}
                    />
                </fieldset>
                <div>
                    <PencilAltIcon 
                        fill='#2F2E41' 
                        onClick={() => handleEditActivity(activityIndex, itineraryIndex)}
                    />
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