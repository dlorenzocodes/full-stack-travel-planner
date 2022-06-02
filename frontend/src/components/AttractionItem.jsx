import { LocationMarkerIcon } from '@heroicons/react/solid'
import fieldimage from '../assets/fieldimage.jpg'

function AttractionItem({ place, style }) {

  return (
    <div className='attraction-item' style={style}>
        <div>
          <img src={fieldimage} alt="landscape field" />
        </div>
        <h3 className='section-heading'>{place.name}</h3>
        <div className='attraction-info'>
            <LocationMarkerIcon fill='#F88747'/>
            <p className='subheading-text'>{place.vicinity}</p>
        </div>
    </div>
  )
}

export default AttractionItem