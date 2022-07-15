import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { closeNoteModal, resetEdits } from '../../features/modals/modalSlice'
import { addNoteReservation, addEditedCategoryItem } from '../../features/trip/tripSlice'

function NoteModal() {

  const dispatch = useDispatch()

  const [ note, setNote ] = useState('')
  const { Notes } = useSelector( state => state.trip )
  const { isEditNotes, index: noteIndex } = useSelector( state => state.modal )

  useEffect(() => {
    if(isEditNotes){
      const noteItem = Notes.find((item, index) => index === noteIndex)
      setNote(noteItem.note)
    }
  },[isEditNotes, noteIndex, Notes])

  const handleNote = (e) => setNote(e.target.value)

  const closeModal = () => dispatch(closeNoteModal())

  const addNote = () => {
    if(note === ''){
      toast.error('Please fill note field!')
      return
    }

    if(isEditNotes) {
      const data = {
        category: 'Notes',
        index: noteIndex,
        formData: { note }
      }
      dispatch(addEditedCategoryItem(data))
      dispatch(closeNoteModal())
      dispatch(resetEdits())
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
          <span className='required-field error'>
            Note field is required
          </span>
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