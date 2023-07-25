import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios'
import { toast } from 'react-hot-toast'





const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading, setLoading}= useContext(Context)
  console.log(isAuthenticated)

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success("logout successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error("assa");
      console.log(error);
      setIsAuthenticated(true)
      setLoading(false);
    }
  };

  return <nav className="header">

    <div><h2>Todo App</h2></div>
    <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profiles</Link>
        

        {
          isAuthenticated?<button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>:<Link to={"/login"}>Login</Link>
        }
        
    </article>
  </nav>
}

export default Header