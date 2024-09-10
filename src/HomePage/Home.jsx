import React from "react";
import packageimg1 from "../img/logo2.png";
import eap110 from "../img/eap110.webp";
import img1 from "../img/eap110.webp";
import img3 from "../img/myphoto.jpg";
import img2 from "../img/slider4.jpg";
import image from "../img/image.jpg";
import hologram from "../img/hologram-img.png";
import NavBar from "../Components/NavBar";
import BottomFooter from "../Components/BottomFooter";
import PersonIcon from "@mui/icons-material/Person";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BusinessIcon from "@mui/icons-material/Business";
import StyleIcon from "@mui/icons-material/Style";
import "./Home.css";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../AdminPages/css/toast.css';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

AOS.init({
  duration: 2000,
  easing: "ease-in-out-sine",
});

function Home() {

  const newreq ={
    fullname:"",
    email:"",
    phoneNo:"",
    dateofBirth:"",
    packageDetail:"",
    address:"",
    createdDate:""
  }
  const [newuser, setNewuser] =useState(newreq);
  const navigate = useNavigate();
  const inputHandler =(e)=>{
    const {name, value} = e.target;
    setNewuser({...newuser, [name]:value});
  }
  
const submituserform = async (e) => {
  e.preventDefault();
  if (!newuser.fullname || !newuser.email || !newuser.phoneNo) {
    toast.error("All fields are required", { className: "toastmsg" });
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:8000/api/SendjoningReq",
      newuser
    );
    toast.success(response.data.msg, { className: "toastmsg" });
    // Clear form fields
    setNewuser({
      fullname: "",
      email: "",
      phoneNo: "",
      dateofBirth: "",
      packageDetail: "",
      address: "",
      createdDate: ""
    });
    // Wait for the state to update before hiding the sidebar and navigating
    setTimeout(() => {
      hideSidebar(); // Close the popup form
      navigate('/');
    }, 0);
  } catch (error) {
    console.log(error);
  }
};

  




  const [slideIndex, setSlideIndex] = useState(0);
  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n - 1);
  };

  const showSlides = (index) => {
    let newIndex = index;
    if (index >= slides.length) {
      newIndex = 0;
    } else if (index < 0) {
      newIndex = slides.length - 1;
    }

    setSlideIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showSlides(slideIndex + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = i === slideIndex ? "block" : "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = i === slideIndex ? "dot active" : "dot";
  }

  function showSidebar() {
    var sidebar = document.querySelector(".formpopup");
    sidebar.style.display = "block";
    sidebar.style.blure = "10px";
  }
  function hideSidebar() {
    var sidebar = document.querySelector(".formpopup");
    sidebar.style.display = "none";
  }






  return (
    <div className="mainBody">
      <NavBar />

      {/* section1-phase of main page */}
      <div className="home-main-section1">
   
        <div className="left_part">
          <div className="name-highlight">
            <h1>
              <span className="welcome">"Welcome </span>
              <span className="welcome-To">TO,</span>
              <br />
              <span className="straight-line">
                <span className="Name-latera">A</span>
                <span className="Name-laterb">V</span>&nbsp;
                <span className="network">
                  <p>NETWORK"</p>
                </span>
              </span>
            </h1>
          </div>
          <div className="offer-containt">
            
          </div>
          <div className="join-btn" data-aos="fade-right">
            <p>
              {" "}
              Click Book Now To, Connect With our Wi-Fi
              <br />
              <span className="middle-text">
                To Explore Internet World.
              </span>{" "}
              <br />
              with Wireless Network{" "}
              <span className="make-red">available in Limited Areas.</span>
            </p>
          </div>
          <button
            onClick={showSidebar}
            className="btn-join btn-primary btn-small"
          >
            Book Now
          </button>
        </div>

        {/* section2-phase of main page */}
        <div className="right_part" data-aos="fade-left">
          <div className="background-container">
            <div className="image-scroller">
              <div class="slideshow-container">
                <div class="mySlides fade-out">
                  <img className="image-scroller1" src={img1} alt="" />
                </div>

                <div class="mySlides fade-out">
                  <img className="image-scroller1" src={img3} alt="" />
                </div>

                <div class="mySlides fade-out">
                  <img className="image-scroller1" src={img2} alt="" />
                </div>
              </div>
              <br />
            </div>
          </div>
          <div className="dot-container">
            <span className="dot" onClick={() => currentSlide(1)}></span>
            <span className="dot" onClick={() => currentSlide(2)}></span>
            <span className="dot" onClick={() => currentSlide(3)}></span>
          </div>
        </div>
      </div>
      <div className="home-main-section2">
        <div className="Package-title"> New Year Package</div>
        <div className="package-card-container">
          <div className="package-card-left" data-aos="fade-right">
            <img className="card-image" src={packageimg1} alt="" />
            <h1 className="heading-containt">STANDARD</h1>
            <div className="package-detail">
              <span className="details">
                Speed -<b>1MBps</b>{" "}
              </span>
              <br />
              <span className="details">
                Amount - <b className="Price-detail">Rs.300</b>
              </span>
              <br />
              <span className="details">
                Bandwidth - <b>25GB</b>
              </span>
              <br />
              <span className="details">
                Duration - <b>1_Month</b>
              </span>
              <br />
            </div>

            <button className="btn-join-small"> Join Now</button>
          </div>

          <div className="package-card-left" data-aos="fade-up">
            <img className="card-image" src={packageimg1} alt="" />
            <h1 className="heading-containt">Lite Pack</h1>
            <div className="package-detail">
              <span className="details">
                Speed - <b>1.5MBps</b>
              </span>
              <br />
              <span className="details">
                Amount -<b className="Price-detail"> Rs.1000</b>
              </span>
              <br />
              <span className="details">
                Bandwidth - <b>unlimited</b>
              </span>
              <br />
              <span className="details">
                Duration - <b>3_Month</b>
              </span>
              <br />
            </div>
            <button className="btn-join-small"> Join Now</button>
          </div>

          <div className="package-card-right" data-aos="fade-up">
            <div className="card-containt">
              <img className="card-image" src={packageimg1} alt="" />
              <h1 className="heading-containt">Premium</h1>
              <div className="package-detail">
                <span className="details">
                  Speed - <b>2MBps</b>
                </span>
                <br />
                <span className="details">
                  Amount - <b className="Price-detail">Rs.1800</b>
                </span>
                <br />
                <span className="details">
                  Bandwidth - <b>unlimited</b>
                </span>
                <br />
                <span className="details">
                  Duration -<b>6_Month</b>
                </span>
                <br />
              </div>
              <button className="btn-join-small"> Join Now</button>
            </div>
            <div className="class-offer">
              <spam>
                +1 Month <br /> Free
              </spam>
            </div>
          </div>

          <div className="package-card-right" data-aos="fade-left">
            <div className="card-containt">
              <img className="card-image" src={packageimg1} alt="" />
              <h1 className="heading-containt">Ultra Premium</h1>
              <div className="package-detail">
                <span className="details">
                  Speed - <b>2.5MBps</b>
                </span>
                <br />
                <span className="details">
                  Amount - <b className="Price-detail">Rs.4000</b>
                </span>
                <br />
                <span className="details">
                  Bandwidth - <b>unlimited</b>
                </span>
                <br />
                <span className="details">
                  Duration - <b>12_Month</b>
                </span>
                <br />
              </div>
              <button className="btn-join-small"> Join Now</button>
            </div>
            <div className="class-offer">
              <p>
                +2 Month <br /> Free
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* section3-phase of main page */}
      <div className="home-main-section3">
        <div className="left-side1" data-aos="fade-right">
          <h1 className="text-top">
            Direct Connect To your <br />
            Smart Devices
          </h1>
          <h2 className="top-text1">2.4 Gh / 5 Gh</h2>
          <img className="card-image-left" src={hologram} alt="" />
        </div>
        <div className="left-side2" data-aos="fade-left">
          <img src={packageimg1} className="left-side-img" alt=""></img>
        </div>
      </div>

      <div className="home-main-section4">
        
<div id="indicators-carousel" class="relative w-full" data-carousel="static">
  <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
            <img src={image} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={img2}  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
        <div class={img1}  data-carousel-item>
            <img src={image}  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={image}  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={img2}  class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
    </div>
    <div class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
      </div>
      <BottomFooter />

      {/* popup form for book services */}
      <div className="BookNowForm"   >
        <form className="formpopup" onSubmit={submituserform}>
          <h1>Joining Request</h1>
          <p>Please Fill Out The Form Below.</p>
          <span className="form-popup-notic">
            Note: Only New User can apply for this.{" "}
          </span>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="fullname">Name:</label>
              <br />
              <span className="form-popup-icons">
                <PersonIcon />
              </span>
              <input
                className="input-popup"
                type="text"
                id="fullname"
                name="fullname"
                onChange={inputHandler}
                autoComplete="off"
                placeholder="enter your fullname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <br />
              <span className="form-popup-icons">
                <MarkEmailReadIcon />
              </span>
              <input
                className="input-popup"
                type="text"
                id="email"
                name="email"
                onChange={inputHandler}
                placeholder="enter your email"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="phoneNo">Phone No:</label>
              <br />
              <span className="form-popup-icons">
                <PhoneCallbackIcon />
              </span>
              <input
                className="input-popup"
                type="text"
                id="phoneNo"
                name="phoneNo"
                onChange={inputHandler}
                placeholder="977XXXXXXXXXX"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateofBirth">Date Of Birth:</label>
              <br />
              <span className="form-popup-icons">
                <CalendarMonthIcon />
              </span>
              <input
                className="input-popup"
                type="date"
                id="dateofBirth"
                onChange={inputHandler}
                name="dateofBirth"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="packageDetail">Selcet Your Package:</label>
              <br />
              <span className="form-popup-icons">
                <StyleIcon />
              </span>
              <select
                className="input-popup"
                type="text"
                id="packageDetail"
                name="packageDetail"
                onChange={inputHandler}
                autoComplete="off"
              >
                <option value="null">Select Package</option>
                <option value="1Mbps-1Month/Rs.300">1Mbps-1Month/Rs.300</option>
                <option value="1Mbps-3Month/Rs.900">1Mbps-3Month/Rs.900</option>
                <option value="Male">1Mbps-1Month/Rs.300</option>
                <option value="Male">1Mbps-1Month/Rs.300</option>
                <option value="Male">1Mbps-1Month/Rs.300</option>
              </select>
            </div>

            <div className="form-group">
            <label htmlFor="address">Address:</label>
            <br />
            <span className="form-popup-icons">
              <BusinessIcon />
            </span>
            <input
              className="input-popup"
              type="text"
              id="address"
              name="address"
              onChange={inputHandler}
              autoComplete="off"
              placeholder="enter your address"
            />
          </div>
          </div>
          

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="createdDate">Date Of joining:</label>
              <br />
              <span className="form-popup-icons">
                <PersonIcon />
              </span>
              <input
                className="input-popup"
                type="date"
                id="createdDate"
                name="createdDate"
                onChange={inputHandler}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form-section">
            <button type="submit" className="btn-join-popup">
              Submit
            </button>
          </div>
          <button onClick={hideSidebar} className="btn-join-popup-close">
            X
          </button>
        </form>
      </div>
    </div>
  );
}
export default Home;
