import React from "react";
import "./About2.css"
// import aboutimg from "../assets/about-img.jpeg"
import aboutimg from "../assets/front1.jpg"
const About = () => {
    return(
    <section className="about" id="about-us">
        <div className="container about-container flex">
            <div className="left-img">
                <img src={aboutimg} />
            </div>
            <div className="about-content">
                <h3>About us</h3>
                <h4>Every day is chance to become better</h4>
                <p className="about-des">power plus gym is your ultimate fitness destination,committed to helping you
                    unleash your inner strength and achieve your wellness goals.</p>
                <div className="box-wrapper flex">
                    <div className="xob">
                        <h4><i className="fa-solid fa-check"></i>body workout</h4>
                        <p>combine cardio and strength exercises for a balanced full-body workout routine</p>
                    </div>
                    <div className="xob">
                        <h4><i className="fa-solid fa-check"></i>healthy life</h4>
                        <p>active movement,nutrient diet,rest and joyful activity ansure wellness</p>
                    </div>
                    <div className="xob">
                        <h4><i className="fa-solid fa-check"></i>strength</h4>
                        <p>inner and outer force enabling endurance,growth and overcoming challenges</p>
                    </div>
                    <div className="xob">
                        <h4><i className="fa-solid fa-check"></i>Fitness</h4>
                        <p>physical and mental state of well-being achieved thtough exercise and lifestyle</p>
                    </div>
                </div>
                <a href="#">
                    <button>Learn More</button>
                </a>
            </div>
        </div>
    </section>

    )
}

export default About;