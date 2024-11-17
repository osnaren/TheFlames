import './footer.scss';

import { useState } from 'react';

import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from 'react-icons/fa';
import FooterWave from '../../assets/footerWave.svg';
import $ from 'jquery';
import { BsArrowBarUp } from 'react-icons/bs';

export default function Footer() {
  // Hide Header on on scroll down
  var didScroll;

  $(window).on('scroll', function (event) {
    didScroll = true;
    if ($(window).scrollTop() > 160) {
      $('#button').addClass('show');
    } else {
      $('#button').removeClass('show');
    }
  });

  $('#button').on('click', function (e) {
    console.log('clicked');
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });

  const [socialMedia, setSocialMedia] = useState([
    {
      id: 1,
      name: 'Facebook',
      icon: <FaFacebook className="socialIcon" />,
      link: 'https://www.facebook.com/',
    },
    {
      id: 2,
      name: 'Instagram',
      icon: <FaInstagram className="socialIcon" />,
      link: 'https://www.instagram.com/',
    },
    {
      id: 3,
      name: 'Twitter',
      icon: <FaTwitter className="socialIcon" />,
      link: 'https://twitter.com/',
    },
  ]);

  return (
    <footer className="new_footer_area bg_color nav-down">
      <div className="new_footer_top">
        <div className="footer__container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              {/* <div
                className="f_widget about-widget pl_70 wow fadeInLeft"
                data-wow-delay="0.6s"
                // style="visibility: visible; animation-delay: 0.6s; animation-name: fadeInLeft;"
              >
                <h3 className="f-title f_600 t_color f_size_18">Help</h3>
                <ul className="list-unstyled f_list">
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Term &amp; conditions</a>
                  </li>
                  <li>
                    <a href="#">Reporting</a>
                  </li>
                  <li>
                    <a href="#">Documentation</a>
                  </li>
                  <li>
                    <a href="#">Support Policy</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="f_widget social-widget pl_70 wow fadeInLeft"
                data-wow-delay="0.8s"
                // style="visibility: visible; animation-delay: 0.8s; animation-name: fadeInLeft;"
              >
                <h3 className="f-title f_600 t_color f_size_18">Get In Touch</h3>
                <div className="f_social_icon">
                  {socialMedia.map((social) => (
                    <a href={social.link} target="_blank" rel="noopener noreferrer" key={social.id}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bg">
          <div className="footer_bg_one"></div>
          <div className="footer_bg_two"></div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="footer__container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-7">
              <p className="mb-0 f_400">© TechForward Inc. 2022 | All rights reserved.</p>
            </div>
            <div className="col-lg-6 col-sm-5 text-right">
              <p>
                Made with <FaHeart className="hearIcon" /> by TechForward
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="button">
        <BsArrowBarUp className="arrowIcon" />
      </div>
    </footer>
  );
}
