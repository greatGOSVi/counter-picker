import './Footer.css';

import rammusOk from '../../assets/rammusOk.png';

const Footer = () => {
  return (
    <footer className='footerContainer'>
      <img alt='Rammus OK' className='rammusOkIcon' src={rammusOk} />

      <div className='infoContainer'>
        <h3>My Info</h3>

        <a
          className='footerLink'
          href='https://www.linkedin.com/in/gabriel-osorno/'
          rel='noreferrer'
          target='_blank'
        >
          LinkedIn
        </a>
        <a
          className='footerLink'
          href='https://github.com/greatGOSVi?tab=repositories'
          rel='noreferrer'
          target='_blank'
        >
          GitHub
        </a>
      </div>

      <div className='infoContainer'>
        <h3>Sources</h3>

        <a
          className='footerLink'
          href='https://developer.riotgames.com/apis'
          rel='noreferrer'
          target='_blank'
        >
          RIOT APIs
        </a>
        <a
          className='footerLink'
          href='https://developer.riotgames.com/docs/lol'
          rel='noreferrer'
          target='_blank'
        >
          RIOT Docs
        </a>
      </div>

      <div className='infoContainer'>
        <h3>Special Thanks!</h3>

        <span>
          <a
            className='footerLink'
            href='https://www.linkedin.com/in/roberto-cervera-chacón-30506716b/'
            rel='noreferrer'
            target='_blank'
          >
            Roberto Cervera{' '}
          </a>
          (React mentoring)
        </span>
        <span>
          <a
            className='footerLink'
            href='https://www.linkedin.com/in/marisolosorno/'
            rel='noreferrer'
            target='_blank'
          >
            Marisol Osorno{' '}
          </a>
          (Web Design tips)
        </span>
      </div>
    </footer>
  );
};

export default Footer;
