import { XIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetTripState } from '../features/trip/tripSlice'
import { openNewTripForm, closedSearchCityModel } from '../features/modals/modalSlice'

function CityModal() {

    const { user } = useSelector( state => state.auth )
    const { cityInfo } = useSelector( state => state.trip)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const image = !cityInfo?.imageURl ? 'http://localhost:3000/static/media/fieldimage.9771d9277256011ffd97.jpg' : cityInfo.imageURl
    const cityDescription = !cityInfo?.cityInfo ? `No information was found about ${cityInfo.title}` : cityInfo.cityInfo

    const style = { backgroundImage: `url(${image})`}

    const handleCloseModal = () => {
        dispatch(closedSearchCityModel())
        dispatch(resetTripState())
    }

    const handleStartTrip = () => {
        if(user) {
            dispatch(openNewTripForm())
            dispatch(closedSearchCityModel())
        }
        else navigate('/login')
    }

    return (
        <section className='city-modal-container'>
            <div className='city-modal-wrapper'>
                <div className='modal-header' style={style}>
                    <div className='close-icon'>
                        <XIcon fill='#F88747' onClick={handleCloseModal}/>
                    </div>
                    <div className='modal-headline'>
                        <h1>Is {cityInfo.title} in your mind?</h1>
                        <button className='btn' onClick={handleStartTrip}>Start planning</button>
                    </div>
                </div>
                <div className='modal-info'>
                    <h3 className='sectiong-heading'>A bit about {cityInfo.title}</h3>
                    <p>{cityDescription}</p>
                </div>
            </div>
        </section>
    )
}

export default CityModal