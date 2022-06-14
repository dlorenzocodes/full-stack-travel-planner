
import { closeHotelModal } from '../../features/modals/modalSlice'
import { useDispatch } from 'react-redux'

function HotelModal() {

    const dispatch =  useDispatch()

    const addHotel = () => dispatch(closeHotelModal())
    
    return (
        <section className='hotel-modal-container trip-modal'>
                <form>
                    <h3>Add a hotel or lodging</h3>
                    <div className='trip-form-control'>
                        <input 
                            type='text' 
                            name='hotel' 
                            id='hotel' 
                            placeholder='Hotel or lodging name'
                        />
                    </div>

                    <div className='trip-form-control'>
                        <input 
                            type='text' 
                            name='hotel-address' 
                            id='hotel-address' 
                            placeholder='Address'
                        />
                    </div>

                    <div className='trip-form-control'>
                        <label>Check in:</label>
                        <div className='db-input'>
                            <input 
                                type='date' 
                                name='checkin-date' 
                                id='checkin-date' 
                            />

                            <input 
                                type='time' 
                                name='checkin-time' 
                                id='checkin-time' 
                            />
                        </div>
                    </div>

                    <div className='trip-form-control'>
                        <label>Check out:</label>
                        <div className='db-input'>
                            <input 
                                type='date' 
                                name='checkout-date' 
                                id='checkout-date' 
                            />

                            <input 
                                type='time' 
                                name='checkout-time' 
                                id='checkout-time' 
                            />
                        </div>
                    </div>

                    <div className='trip-form-control'>
                    <textarea 
                        name='hotel-notes' 
                        id='hotel-notes' 
                        placeholder='Notes'
                        />
                    </div>

                    <button 
                        type='button' 
                        className='btn'
                        onClick={addHotel}
                    >
                            Add hotel or lodging
                    </button>

                </form>
            </section>
    )
}

export default HotelModal