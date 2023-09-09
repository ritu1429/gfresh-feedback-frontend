import React from 'react'
import successLogo from '../assets/successLogo.png'
function Thankyou() {
    return (
        <div class="container1">
        <div className='pb-2'><img src={successLogo} height='80px'/></div>
            <div><h1 className='fw-600'>Thankyou!</h1></div>
            <div className='font-18 fw-600'>Your FeedBack has been sent successfully.</div>
        </div>
    )
}

export default Thankyou