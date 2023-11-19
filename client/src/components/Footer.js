import styled from "styled-components";
import MyButton from "./style/Mybutton";
import { BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";
import React from "react";
const Footer = () => {
  // function get trigger when form get submit
  const submitchange = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
      {/* Above Footer part */}
      <div className="footer-before-box">
        <div className="footer-before">
          <div>
            <p>Ready to get started?</p>
            <p>Talk to us today</p>
          </div>
          <div>
            <MyButton>Get Started</MyButton>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="main-footer">
        <div className="box box1">
          <p>Rupesh Upadhyay</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
            dolorem consequuntur eaque velit exercitationem debitis iusto
            tempora quisquam accusam
          </p>
        </div>
        <div className="box box2">
          <p>Subscribe to get important Upadte</p>
          <form action="#" onSubmit={submitchange}>
            <div>
              <input
                type="email"
                placeholder="Enter Email"
                className="emailinput"
              />
            </div>
            <div>
              <input type="submit" value="Subscribe" className="submitinput" />
            </div>
          </form>
        </div>
        <div className="box box3">
          <p> Follow us</p>
          <div className="socialiconbox">
            <div>
              <a href="#" target="_blank">
                <BsYoutube className="socialicon" />
              </a>
            </div>
            <div>
              <a href="#" target="_blank">
                <BsInstagram className="socialicon" />
              </a>
            </div>
            <div>
              <a href="#" target="_blank">
                <BsTwitter className="socialicon" />
              </a>
            </div>
          </div>
        </div>
        <div className="box box4">
          <p>Call us</p>
          <div className="call">
            <a href="tel:123456789">+91 123456789</a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bottom-footer">
        <hr />
        <div className="bottom-footer-box">
          <div>
            <p>
              @{new Date().getFullYear()} Rupesh Upadhyay. All Rights Reserved
            </p>
          </div>
          <div>
            <p>PRIVACY POLICY</p>
            <p>TERMS & CONDITIONS</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.footer`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #080818;
  color: white;

  /*css of before footer*/

  .footer-before-box {
    color: black;
    boder: 2px solid;
    width: 90%;
    margin-top: 20px;
    background-color: rgb(239, 237, 237);

    .footer-before {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  /*css of main footer*/

  .main-footer {
    display: flex;
    boder: 2px solid;
    width: 90%;

    .box {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px;

      p {
        font-size: 0.9em;
      }
    }
    .box2 {
      form {
        display: flex;
        flex-direction: column;

        .emailinput {
          width: 80%;
          height: 40px;
          text-indent: 5px;
          font-size: 0.9em;
          font-family: 'Poppins', sans-serif;
          &:focus {
            outline: none;
          }
        }

        .submitinput {
          margin-top: 10px;
          padding: 5px 10px;
          font-size: 0.9em;
          border:0px;
          border-radius: 4px;
          background-color: rgb(215, 0, 73);
          color: white;
        }
      }
    }
    .box3 {
      .socialiconbox {
        display: flex;
        div {
          font-size: 1.5em;
          margin: 0px 5px;
          .socialicon {
            color: white;
          }
        }
      }
    }
    .box4 {
      .call a {
        text-decoration: none;
        color: white;
      }
    }
  }

  /*css of bottom footer*/

  .bottom-footer-box {
    display: flex;
    width: 100vw;
    justify-content: space-around;
    align-items: center;
    div {
      p {
        font-size: 0.9em;
      }
    }
  }

  /*Media Query starts (footer)*/

  @media (max-width: ${({ theme }) => theme.responsive.Medium}) {
    font-size: 13px;
    .main-footer {
      width: 95%;
      .box2 {
        form {
          .emailinput {
            width: 90%;
            height: 30px;
          }
          .submitinput {
            margin-top: 10px;
            padding: 2px 10px;
          }
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.responsive.Small}) {
    .footer-before-box {
      width: 90%;
    }
    .main-footer {
      flex-direction: column;
      .box2 form .submitinput{
        padding:7px;
      }
    }
    .bottom-footer {
      .bottom-footer-box {
        flex-direction: column;
      }
    }
  }
`;
export default Footer;

