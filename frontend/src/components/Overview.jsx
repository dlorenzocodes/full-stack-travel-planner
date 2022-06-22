import CarItem from './CarItem'
import { useState } from 'react'
import NoteItem from './NoteItem'
import { v4 as uuidv4 } from 'uuid'
import OtherItem from './OtherItem'
import FlightItem from './FlightItem'
import LodgingItem from './LodgingItem'
import { TbDots } from 'react-icons/tb'
import { MdNoteAlt } from 'react-icons/md'
import { IoCarSportSharp } from 'react-icons/io5'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdBed, IoIosAirplane } from 'react-icons/io'
import { tripFormFieldsets } from '../utils/TripFromFieldsets'
import { 
    openFlightModal, 
    openHotelModal, 
    openCarModal, 
    openOtherModal,
    openNoteModal
} from  '../features/modals/modalSlice'

function Overview() {

    const dispatch = useDispatch()
    const { Flights, Cars, Lodging, Notes, Other } = useSelector( state => state.trip )

    const tripData = { Flights, Cars, Lodging, Notes, Other }
    const resevationComponents = {
        Flights: <FlightItem />,
        Cars: <CarItem />,
        Lodging: <LodgingItem />,
        Other: <OtherItem />,
        Notes: <NoteItem />
    }
    
    const [isClicked, setIsClicked] = useState({
        Flights: false,
        Cars: false,
        Lodging: false,
        Other: false,
        Notes: false
    })

    const onClick = (e, index) => {
        if(e.target.id === index.toString()){
            console.log(index)
            setIsClicked((prevState) => ({
                ...prevState,
                [e.target.dataset.cat]: !prevState[e.target.dataset.cat]
            }))
        }
    }

    const lowercaseCat = (string) => {
        const firstLetter = string.split('').shift().toLowerCase()
        const String = string.split('')
        String.splice(0,1,firstLetter)
        const newString = String.join('')
        return newString
    }

    const handleFlightModal = () => dispatch(openFlightModal())
    const handleHotelModal = () => dispatch(openHotelModal())
    const handleCarModal = () => dispatch(openCarModal())
    const handleOtherModal = () => dispatch(openOtherModal())
    const handleNoteModal = () => dispatch(openNoteModal())

    return (
        <div className='trip-overview'>
            <h2 className='section-heading'>Add Reservations</h2>
            <section className='reservation-icons'>

                    <button type='button' onClick={handleFlightModal}>
                        <IoIosAirplane fill='#2F2E41'/>
                        <p>Flights</p>
                    </button>

                    <button type='button' onClick={handleHotelModal}>
                        <IoMdBed fill='#2F2E41'/>
                        <p>Lodging</p>
                    </button>

                    <button type='button' onClick={handleCarModal}>
                        <IoCarSportSharp fill='#2F2E41'/>
                        <p>Cars</p>
                    </button>

                    <button type='button' onClick={handleOtherModal}>
                        <TbDots fill='#2F2E41'/>
                        <p>Other</p>
                    </button>

                    <button type='button' onClick={handleNoteModal}>
                        <MdNoteAlt fill='#2F2E41'/>
                        <p>Notes</p>
                    </button>

            </section>

            <section className='trip-form'>
                <form>
                    { tripFormFieldsets.map( (field, index) => (
                        <fieldset id={field} key={uuidv4()}>
                            <div>
                                <h3>{field}</h3>
                                <ChevronUpIcon 
                                    type='button'
                                    id={index}
                                    data-cat={field}
                                    className={ isClicked[field] ? `rotate` : ''} 
                                    onClick={(e) => onClick(e, index)}
                                />   
                            </div>

                            <section className={`${field}-container`}>
                                    <div 
                                        className={ isClicked[field] ? 
                                        'reservation-block show' : 
                                        'reservation-block'}
                                    >
                                        { 
                                            tripData[field].length === 0 ?
                                            <p>
                                                You have no {lowercaseCat(field) === 'other' ? 'other reservation' : lowercaseCat(field)}. 
                                                Please click the {lowercaseCat(field)} icon to add reservations.
                                            </p> 
                                            : resevationComponents[field]
                                        }
                                    </div> 
                            </section>   

                        </fieldset>
                    ))}
                </form>
            </section>
        </div>
    )
}

export default Overview