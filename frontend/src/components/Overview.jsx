import { TbDots } from 'react-icons/tb'
import { IoMdBed } from 'react-icons/io'
import { IoIosAirplane } from 'react-icons/io'
import { IoCarSportSharp } from 'react-icons/io5'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { tripFormFieldsets } from '../utils/TripFromFieldsets'
import { v4 as uuidv4 } from 'uuid';

function Overview() {
  return (
    <div className='trip-overview'>
         <h2 className='section-heading'>Add Reservations</h2>
        <section className='reservation-icons'>
                <button type='button'>
                    <IoIosAirplane />
                    <p>Flights</p>
                </button>
                <button type='button'>
                    <IoMdBed />
                    <p>Lodging</p>
                </button>
                <button type='button'>
                    <IoCarSportSharp />
                    <p>Cars</p>
                </button>
                <button type='button'>
                    <TbDots />
                    <p>Other</p>
                </button>
        </section>

        <section className='trip-form'>
            <form>
                { tripFormFieldsets.map( field => (
                    <fieldset id={field} key={uuidv4()}>
                        <div>
                            <h3>{field}</h3>
                            <ChevronUpIcon />
                        </div>
                    </fieldset>
                ))}
            </form>
        </section>
    </div>
  )
}

export default Overview