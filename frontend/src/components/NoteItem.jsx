import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { removeCategoryItem } from '../features/trip/tripSlice'
import { openNoteModal ,editOverviewCategories } from '../features/modals/modalSlice'

function NoteItem() {

    const dispatch = useDispatch()
    const { Notes } = useSelector( state => state.trip )

    const editNote = (e, index) => {
        const data = {
            category: e.target.id,
            index
        }
        dispatch(editOverviewCategories(data))
        dispatch(openNoteModal())
    }

    const removeNote = (e, index) => {
        if(window.confirm('Are you sure you want to delete?')){
            const data = {
                category: e.target.id,
                index
            }
            dispatch(removeCategoryItem(data))
        }
    }   

    return (
        <section className='notes-container'>
            {Notes.map( (item, index) => (
                <div className='note-info' key={uuidv4()}>

                    <h3 className='section-heading'>Notes</h3>
                    <p id='textarea-notes'>{item.note}</p>

                    <div className='operation-icons'>
                        <button
                            type='button'
                            id='Notes'
                            onClick={(e) => editNote(e, index)}
                        >
                            <PencilAltIcon  fill='#2F2E41'/>
                        </button>

                        <button
                            type='button'
                            id='Notes'
                            onClick={(e) => removeNote(e, index)}
                        >
                            <TrashIcon fill='#2F2E41'/>
                        </button>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default NoteItem