import { useDispatch } from 'react-redux'
import { closeNoteModal } from '../../features/modals/modalSlice'

function NoteModal() {

  const dispatch = useDispatch()

  const addNote = () => dispatch(closeNoteModal())

  return (
    <section className='note-modal-container trip-modal'>
        <form>
          <h3>Add note</h3>

          <div className='trip-form-control'>
          <textarea 
              name='note' 
              id='note' 
              placeholder='notes'
              />
          </div>

          <button 
              type='button' 
              className='btn'
              onClick={addNote}
          >
                  Add note
          </button>

        </form>
    </section>
  )
}

export default NoteModal