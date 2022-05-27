import './Footer.css';

const Footer = () => {

    return(
        <div className="footerContainer">
            <div className='infoContainer'>
                <h3>My Info</h3>

                <a href="https://www.linkedin.com/in/gabriel-osorno/" 
                    target="_blank" >My LinkedIn</a>
                <div> or </div>
                <a href="https://github.com/greatGOSVi?tab=repositories" 
                    target="_blank" >Visit my GitHub Repos!</a>
            </div>

            <div className='infoContainer'>
                <h3>Special Thanks!</h3>

                <a href="https://www.linkedin.com/in/roberto-cervera-chacón-30506716b/" 
                    target="_blank" >Roberto Cervera</a>
                <div>For React and Web Development mentoring</div>
                <div>&</div>
                <a href="https://www.linkedin.com/in/marisolosorno/" 
                    target="_blank" >Marisol Osorno</a>
                <div>For Web Design help and tips</div>
            </div>
        </div>
    );

}

export default Footer;