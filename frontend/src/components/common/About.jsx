import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <h2>LearnHub</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav>
              <Link to={"/"} className="link">
                Home
              </Link>
              <Link to={"/about"} className="link">
                About
              </Link>
              <Link to={"/login"} className="link">
                Login
              </Link>
              <Link to={"/register"} className="link">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="first-container">
        <p id="head">About Us</p>
        <div id="about">
          <p>
            Welcome to <strong>LearnHub</strong>, your center for skill
            enhancement. Our mission is to make quality education accessible,
            affordable, and adaptable for everyone, everywhere. We offer a wide
            range of online courses across technology, business, personal
            development, and more — tailored to meet the needs of both beginners
            and professionals. Join our learning community today and take the
            next step in your career with expert-led training and hands-on
            projects.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
