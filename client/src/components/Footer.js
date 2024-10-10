import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4'>
       <p className='text-center font-bold' title='Elda-Appliances'>Copyright © 2024 ELDA Appliances - All Rights Reserved.<br></br>
       Marketed by LaMart Group<br></br>
       Registered Office : Plot No 17A, Majestic Avenue, Krishna Nagar, Madhavaram Milk Colony, Chennai, Tamilnadu 600051.<br></br>
       ELDA Appliances logo and it is Design Trademark owned by LaMART Group.
       </p>
       <div className="mt-4 text-center">
          <a href="/PrivacyPolicy" className="text-black-600 font-semibold hover:underline mx-2">
            Privacy Policy
          </a>
          <a href="/TermsAndConditions" className="text-black-600 font-semibold hover:underline mx-2">
            Terms and Conditions
          </a>
          <a href="/RefundPolicy" className="text-black-600 font-semibold hover:underline mx-2">
            Refund Policy
          </a>
          <a href="/ShippingPolicy" className="text-black-600 font-semibold hover:underline mx-2">
            Shipping Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer