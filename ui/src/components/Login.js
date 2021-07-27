import React, { useState } from "react";
import hero from '../assets/hero.jpg';
import LoaderSVG from '../assets/loader.svg'
import axios from 'axios';

function Login({ airlines, setUser }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [airline, setAirline] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const loginOnApi = async (airline, username, password, rememberMe) => {
    const payload = {
      "airline": airline,
      "username": username,
      "password": password,
      "remember_me": rememberMe 
    }

    try {
      const response = await axios.post('http://localhost/api/login', payload, {withCredentials: true});
      setUser(response.data.user);
    } catch (error) {
      setError(error.response.data.error);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    loginOnApi(airline, username, password, rememberMe);
  }

  return (
    <section className="w-full h-full min-h-screen top-0" style={{ background: `url(${hero}`, backgroundSize: 'cover' }}>
      <div className="top-0 w-full h-full"></div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4 pt-32">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">Welcome to ID90 Travel</h6>
                  <small>Please sign in with your credentials</small>
                </div>
                <div className="btn-wrapper text-center">
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-5">
                  {loading ? <img className="m-auto" src={ LoaderSVG } alt="Loading..." /> :
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Airline</label>
                        <select type="text" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" onChange={e => setAirline(e.target.value)}>
                          <option></option>
                          {Object.keys(airlines).map(function(key, i) {
                            return <option key={i}>{ airlines[key] }</option>
                          })}
                        </select>
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Username</label>
                        <input type="text" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Username" value={ username } onChange={e => setUsername(e.target.value)} />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Password</label>
                        <input type="password" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" value={ password } onChange={e => setPassword(e.target.value)} />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                        <input id="customCheckLogin" type="checkbox" className="form-checkbox text-gray-800 ml-1 w-5 h-5" onChange={() => setRememberMe(!rememberMe)} checked={rememberMe} /><span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span></label>
                      </div>
                      {error ? <span className="block text-center text-red-600 font-bold text-sm mt-5">{error}</span> : ''}
                      <div className="text-center mt-5">
                        <button className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit">Sign In</button>
                      </div>
                    </form>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;