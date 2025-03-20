import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
            itaque unde facere repellendus, odio et iste voluptatem aspernatur.
          </p>
          <div className="contact-info">
            <p>
              <FaPhone className="icon" /> +1 291 3912 329
            </p>
            <p>
              <FaEnvelope className="icon" /> info@gmail.com
            </p>
          </div>
          <div className="newsletter">
            <input type="email" placeholder="Enter your e-mail" />
            <button>Send</button>
          </div>
        </div>

        <div className="footer-section latest-tweet">
          <h2>Latest Tweet</h2>
          <p>
            <i>Lorem ipsum dolor sit amet, consectetur.</i>
          </p>
          <p>
            <i>Lorem ipsum dolor sit amet, consectetur.</i>
          </p>
        </div>

        <div className="footer-section instagram">
          <h2>Instagram</h2>
          <div className="instagram-images">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLlsNK_i6ME4whQL_p-BJ64KtzGSZxElsctQ&s" alt="img1" />
            <img src="https://img.lovepik.com/photo/40005/9569.jpg_wh860.jpg" alt="img2" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKfmSfeorPUFWfFGfsWVdRCXEA1bjQkWVhpA&s" alt="img3" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzQEQEUuBgaWuluoSSzJfQVp1ZjYa4Fxw8NQ&s" alt="img4" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Our works</a>
          <a href="#">Services</a>
          <a href="#">Blog</a>
          <a href="#">Contacts</a>
        </div>
        <p>Colorlib</p>
      </div>
    </footer>
  );
};

export default Footer;
