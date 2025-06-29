import React from 'react'
import "./Footer.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
function Footer() {
  return (
    <div className='outer-footer-container'>
      <div className='inner-container'>
        <div className='footer-links'>
          <FacebookIcon/>
          <InstagramIcon/>
          <TwitterIcon/>
          <YouTubeIcon/>
        </div>
 <div className='columns-container'>
            <div className='column-1'>
              <ul>
                <li>Auto Description</li>
                <li>Investor Relations</li>
                <li>Privacy</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className='column-2'>
              <ul>
                <li>Help Center</li>
                <li>Jobs</li>
                <li>Legal Notices</li>
                <li>Do Not Sell or Share My Personal Information</li>
              </ul>
            </div>
            <div className='column-3'>
              <ul>
                <li>Gift Cards</li>
                <li>Netflix Shop</li>
                <li>Cookie Preferences</li>
                <li>Ad Choices</li>
              </ul>
            </div>
            <div className='column-4'>
              <ul>
            <li>Media Center</li>
            <li>Terms of Use</li>
            <li>Corporate Information</li>
          </ul></div>
          </div>
          <div className='service'>
            <p>Service Code</p>
          </div>
          <div className='copyright'>
           &copy;1997-2025 Netflix,inc.
          </div>
      </div>
    </div>
  )
}

export default Footer