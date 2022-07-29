import React from 'react'

function ForgotPassword() {
    const style = {
        paddingBottom: '0.5rem'
    }

    return (
        <div className='form-wrapper'>
            <form>
                <h2 style={style}>Update your password</h2>
                <p 
                    className='subheading-text pb-1'
                >
                    Enter your email and select <strong>Send Email</strong>
                </p>

                <div className="form-control">
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        placeholder='email'
                    />
                </div>

                <div className="form-control no-pt">
                    <button className="btn sign-up-btn">Send Email</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword