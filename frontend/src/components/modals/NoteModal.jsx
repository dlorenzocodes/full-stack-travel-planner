import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { XIcon } from '@heroicons/react/outline'
import { closeNoteModal } from '../../features/modals/modalSlice'
import { addNoteReservation } from '../../features/trip/tripSlice'

function NoteModal() {

  const dispatch = useDispatch()

  const [ note, setNote ] = useState('')

  const handleNote = (e) => setNote(e.target.value)

  const closeModal = () => dispatch(closeNoteModal())

  const addNote = () => {
    if(note === ''){
      dispatch(closeNoteModal())
      return
    }
    dispatch(addNoteReservation({note}))
    dispatch(closeNoteModal())
  }

  return (
    <section className='note-modal-container trip-modal'>
        <form>
          <XIcon onClick={closeModal}/>
          <h3>Add note</h3>
          <div className='trip-form-control'>
          <textarea 
              name='note' 
              id='note' 
              value={note}
              onChange={handleNote}
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