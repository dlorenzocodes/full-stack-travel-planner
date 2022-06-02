import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid'

function Arrows({ slideLeft, slideRight }) {
  return (
    <div className='arrows'>
        <ChevronLeftIcon className='arrow-left' onClick={slideLeft}/>
        <ChevronRightIcon className='arrow-right' onClick={slideRight}/>
    </div>
  )
}

export default Arrows