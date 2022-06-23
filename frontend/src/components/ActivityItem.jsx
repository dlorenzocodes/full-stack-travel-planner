import { useState } from 'react'
import useTime from '../hooks/useTime'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function ActivityItem({ activityValues, index }) {

    const { formatTime } = useTime()
    const [ isDisabled, setIsDisabled ] = useState(true) 
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

    return (
        <div className='activity-card' id={index}>
            <form>
                <fieldset>
                    <input 
                        type='text' 
                        name='activity' 
                        id='activity'
                        value={activity}
                        disabled={isDisabled}
                        onChange={handleForm}
                        placeholder='Activity'
                    />
                    <input 
                        type='timeEdit' 
                        id='timeEdit'
                        value={formatTime(time)}
                        disabled={isDisabled}
                        onChange={handleForm}
                    />
                </fieldset>
                <div>
                    <PencilAltIcon fill='#2F2E41'/>
                    <TrashIcon fill='#2F2E41'/>
                </div>
            </form>
        </div>
    )
}

export default ActivityItem