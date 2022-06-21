import { useState } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function ActivityItem({ activityValues, index }) {

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
                        onChange={handleForm}
                        placeholder='Activity'
                    />
                    <input 
                        type='timeEdit' 
                        id='timeEdit'
                        value={time}
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