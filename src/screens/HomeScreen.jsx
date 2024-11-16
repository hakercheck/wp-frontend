import React, {useState, useEffect } from "react";
//import '../styles/';

const HomeScreen = () => {

  return (
    <div>
      <section className="home" id="home">
        <form action="#">
          <div className="search-box">
            <h1>Your Wedding,Your Way</h1>
            <p>
              Find the best wedding vendors with thousands of trusted reviews
            </p>
            <select type="text" className="search-field">
              <option disabled selected>
                Select vendor type
              </option>
              <option value="Wedding Venues">Wedding Venues</option>
              <option value="Family makeup">Family makeup</option>
              <option value="bridal makeup">Bridal Makeup</option>
              <option value="Groom Wear">Groom Wear</option>
              <option value="Wedding Decoration">Wedding decoration</option>
            </select>
            <select type="text" className="search-field">
              <option disabled selected>
                City
              </option>
              <option disabled selected>
                City
              </option>
              <option value="Anand">Anand</option>
              <option value="Ahemdabad">Ahemdabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Baroda">Baroda</option>
              <option value="Goa">Goa</option>
            </select>
            <button className="btn">Search</button>
          </div>
        </form>
      </section>

      <section className="service" id="service">
        <div className="title">
          <h1>
            <span>S</span>ervice
          </h1>
        </div>
        <div className="services-row">
          <div className="services-col">
            <i className="fas fa-book-open" />
            <h2>invitation</h2>
            <p>
              Lorem ipsum dolor sit amet, at mei dolore tritani repudiandae.
            </p>
          </div>
          <div className="services-col">
            <i className="fas fa-camera" />
            <h2>Photography &amp; Video</h2>
            <p>
              Lorem ipsum dolor sit amet, at mei dolore tritani repudiandae.
            </p>
          </div>
          <div className="services-col">
            <i className="fas fa-brush" />
            <h2>Beauty &amp; Makeup</h2>
            <p>
              Lorem ipsum dolor sit amet, at mei dolore tritani repudiandae.
            </p>
          </div>
          <div className="services-col">
            <i className="fab fa-pagelines" />
            <h2>Wedding flowers</h2>
            <p>
              Lorem ipsum dolor sit amet, at mei dolore tritani repudiandae.
            </p>
          </div>
          <div className="services-col">
            <i className="fas fa-birthday-cake" />
            <h2>wedding cake</h2>
            <p>
              Lorem ipsum dolor sit amet, at mei dolore tritani repudiandae.
            </p>
          </div>
          <div className="services-col">
            <i className="fas fa-music" />
            <h2>music band</h2>
            <p>
              Lorem ipsum dolor sit amet, at mei dolore tritani repudiandae.
            </p>
          </div>
          <div className="services-col">
            <i className="fas fa-utensils" />
            <h2>Catering</h2>
            <p>
              Lorem ipsum dolor sit amet, at mei dolore tritani repudiandae.
            </p>
          </div>
          <div className="services-col">
            <i className="fas fa-ring" />
            <h2>Jewellery</h2>
            <p>
              Lorem ipsum dolor sit amet, at mei dolore tritani repudiandae.
            </p>
          </div>
        </div>
      </section>

      <section className="vendor" id="vendor">
        <div className="title">
          <h1>
            <span>F</span>eatured <span>V</span>endor
          </h1>
        </div>
        <div className="vendor-list">
          <div className="vendor-row">
            <div className="rate">
              4.5&nbsp;
              <i className="fa fa-star" aria-hidden="true" />
            </div>
            <img src="im1.jpg" alt="img" />
            <h2>Beauty tales by komal rai</h2>
            <p>Bridal Makeup</p>
            <h3>Rs.20,000 onwards</h3>
          </div>
          <div className="vendor-row">
            <div className="rate">
              4.2&nbsp;
              <i className="fa fa-star" aria-hidden="true" />
            </div>
            <img src="im2.jpg" alt="img" />
            <h2>Flinters Management</h2>
            <p>Wedding Planner</p>
            <h3>Rs.2.5-4 Lakh</h3>
          </div>
          <div className="vendor-row">
            <div className="rate">
              5.0&nbsp;
              <i className="fa fa-star" aria-hidden="true" />
            </div>
            <img src="im3.jpg" alt="img" />
            <h2>Wedding Mela</h2>
            <p>Wedding Decorators</p>
            <h3>Rs.80,000-30,00,000</h3>
          </div>
          <div className="vendor-row">
            <div className="rate">
              4.1&nbsp;
              <i className="fa fa-star" aria-hidden="true" />
            </div>
            <img src="im4.jpg" alt="img" />
            <h2>SeventhHeaven Wedding Company</h2>
            <p>Wedding Decorators-Rental Only</p>
            <h3>Rs.80,000 Onwards</h3>
          </div>
          <div className="vendor-row">
            <div className="rate">
              4.3&nbsp;
              <i className="fa fa-star" aria-hidden="true" />
            </div>
            <img src="im5.jpg" alt="img" />
            <h2>Wedding Mela</h2>
            <p>Wedding Decorators</p>
            <h3>Rs.80,000-30,00,000</h3>
          </div>
          <div className="vendor-row">
            <div className="rate">
              4.0&nbsp;
              <i className="fa fa-star" aria-hidden="true" />
            </div>
            <img src="im6.jpg" alt="img" />
            <h2>Wedding Mela</h2>
            <p>Wedding Decorators</p>
            <h3>Rs.1.8 Lakh</h3>
          </div>
        </div>
      </section>

      <section className="venue" id="venue">
        <div className="title">
          <h1>
            <span>V</span>enues
          </h1>
        </div>
        <div className="venue-list">
          <div className="venue-box">
            <img src="venue-5.jpg" alt="img" />
            <div className="venue-info">
              <h2>Goa</h2>
              <p>Azaya Beach Resort, Goa</p>
              <button className="btn">More Info</button>
            </div>
          </div>
          <div className="venue-box">
            <img src="venue-2.jpg" alt="img" />
            <div className="venue-info">
              <h2>Jaipur</h2>
              <p>The Raj Palace</p>
              <button className="btn">More Info</button>
            </div>
          </div>
          <div className="venue-box">
            <img src="venue-3.jpg" alt="img" />
            <div className="venue-info">
              <h2>Udaipur</h2>
              <p>Taj Aravalli Resort and Spa</p>
              <button className="btn">More Info</button>
            </div>
          </div>
          <div className="venue-box">
            <img src="venue-4.jpg" alt="img" />
            <div className="venue-info">
              <h2>Thailand</h2>
              <p>Prince Palace Hotel</p>
              <button className="btn">More Info</button>
            </div>
          </div>
          <div className="venue-box">
            <img src="venue-5.jpg" alt="img" />
            <div className="venue-info">
              <h2>Mumbai</h2>
              <p>Grand Banquet, Chembur</p>
              <button className="btn">More Info</button>
            </div>
          </div>
          <div className="venue-box">
            <img src="venue-6.jpg" alt="img" />
            <div className="venue-info">
              <h2>Daman</h2>
              <p>The Deltin,Daman</p>
              <button className="btn">More Info</button>
            </div>
          </div>
        </div>
      </section>

      <section className="invite" id="invite">
        <div className="title">
          <h1>
            Card<span>Design</span>
          </h1>
          <p>Choose the best card Design.</p>
        </div>
        <div className="invitation-row">
          <div className="invitation-box">
            <img src="card-1.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-2.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-3.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-4.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-5.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-6.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-7.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-8.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-9.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-10.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-11.jpg" alt />
          </div>
          <div className="invitation-box">
            <img src="card-12.jpg" alt />
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="container">
          <div className="f-container">
            <h2>WedMeGood - Your Personal Wedding Planner</h2>
            <br />
            <p>
              Plan your wedding with Us WedMeGood is an Indian Wedding Planning
              Website{" "}
            </p>
            <div>
              <button className="btn">Register as a Vendor</button>
            </div>
            <div className="social">
              <i className="fab fa-facebook" />
              <i className="fab fa-instagram" />
              <i className="fab fa-linkedin" />
              <i className="fab fa-twitter" />
              <i className="fab fa-pinterest" />
            </div>
          </div>
          <div className="f-container">
            <h2>Our Location</h2>
            <a href="#">
              <i className="fas fa-angle-right" />
              Anand
            </a>
            <a href="#">
              <i className="fas fa-angle-right" />
              Vadodara
            </a>
            <a href="#">
              <i className="fas fa-angle-right" />
              Mumbai
            </a>
            <a href="#">
              <i className=" fas fa-angle-right " />
              Ahemdabad
            </a>
            <a href="#">
              <i className="fas fa-angle-right " />
              Surat
            </a>
          </div>
          <div className="f-container ">
            <h2>Our Newsletter</h2>
            <p>Subscribe for latest updates</p>
            <input type="text " placeholder="Enter Your Email " />
            <button className="btn ">Subscribe</button>
          </div>
        </div>
      </footer>
      <div className="copyright ">
        <p>Copyright ©2022 All Rights Reserved | Knowledge Place KP</p>
      </div>
    </div>
  );
};

export default HomeScreen;
