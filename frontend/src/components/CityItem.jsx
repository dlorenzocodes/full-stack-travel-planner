import fieldimage from '../assets/fieldimage.jpg'
import { LocationMarkerIcon } from '@heroicons/react/solid'

function CityItem({ city, style }) {
  return (
    <div className='city-item' style={style}>
        <div>
          <img src={fieldimage} alt="landscape field" />
        </div>
        <h3 className='section-heading'>{city.toponymName}</h3>
        <div className='city-info'>
            <LocationMarkerIcon fill='#F88747'/>
            <p className='subheading-text'>{city.countryName}</p>
        </div>
    </div>
  )
}

export default CityItem