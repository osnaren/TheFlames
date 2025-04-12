import './Footer.scss';

import { useEffect, useState } from 'react';

import $ from 'jquery';
import { BsArrowBarUp } from 'react-icons/bs';
import { FaFacebook, FaHeart, FaInstagram, FaTwitter } from 'react-icons/fa';

interface SocialMedia {
  id: number;
  name: string;
  icon: JSX.Element;
  link: string;
}

export default function Footer(): JSX.Element {
  useEffect(() => {
    // Setup scroll event handler
    const handleScroll = () => {
      if ($(window).scrollTop()! > 160) {
        $('#button').addClass('show');
      } else {
        $('#button').removeClass('show');
      }
    };

    // Add scroll event listener
    $(window).on('scroll', handleScroll);

    // Add click handler for the button
    $('#button').on('click', (e) => {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, '300');
    });

    // Cleanup function to remove event listeners
    return () => {
      $(window).off('scroll', handleScroll);
      $('#button').off('click');
    };
  }, []);

  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([
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
            <div className="col-lg-3 col-md-6">{/* Help section commented out in original code */}</div>
            <div className="col-lg-3 col-md-6">
              <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s">
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
          <div className="footer_bg_one" />
          <div className="footer_bg_two" />
        </div>
      </div>
      <div className="footer_bottom">
        <div className="footer__container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-7">
              <p className="f_400 mb-0">© TechForward Inc. 2022 | All rights reserved.</p>
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
