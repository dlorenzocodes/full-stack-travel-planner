
export default function Button({children, type, isDisabled}) {
  return (
    <button type={type} disabled={isDisabled} className='btn sign-up-btn'>
        {children}
    </button>
  )
}
