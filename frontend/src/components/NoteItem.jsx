import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

function NoteItem() {

    const { Notes } = useSelector( state => state.trip )

    return (
        <section className='notes-container'>
            {Notes.map( item => (
                <div className='note-info' key={uuidv4()}>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{item.note}</p>

                    <div>
                        <PencilAltIcon  fill='#2F2E41' id='Notes'/>
                        <TrashIcon fill='#2F2E41' id='Notes'/>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default NoteItem