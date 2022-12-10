import React from "react";
import { BsGithub } from "react-icons/bs";

const Footer = () => {


    return (
        
        <footer>
            <b>&copy; {new Date().getFullYear()} Developed by ShueiYang ❤️ </b>
            <div>
              <BsGithub className="icon-bs me-1 mb-1"/>
                <a href="https://github.com/ShueiYang" rel="noreferrer"
                    target="_blank" className="cool-link"><b>GitHub</b></a>
            </div>
             
        </footer>
    )
}

export default Footer;    
            
    