import React,{ useState } from "react";
import userImage from "./assets/user.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const navigate=useNavigate()
  const [formdata, setformdata] = useState({
    username: '',
    password: ''
  });

  const handlechange = e => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login',formdata);//your login POST route

      const token=response.data.token;
      if(token){
        localStorage.setItem('token',token);
        navigate('/home')
        alert('login successful')
      }else{
        alert("Login Failed no token received")
      }
      console.log("login successful")
      console.log(response.data);
      
    } catch (error) {
      console.log("login error", error);
    }
  };
  return (
    <>
      <section
        className="bg-dark py-3 py-md-5"
        style={{
          maxHeight: "100vh",
          overflow: "auto",
          backgroundColor: "black",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <a href="#!">
                      <img
                        src={userImage}
                        alt="BootstrapBrain Logo"
                        width={135}
                        height={92}
                      />
                    </a>
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                    Welcome to Base
                  </h2>
                  <form onSubmit={handlesubmit}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            required
                            onChange={handlechange}
                          />
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            defaultValue=""
                            placeholder="Password"
                            required
                            onChange={handlechange}
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signin;
