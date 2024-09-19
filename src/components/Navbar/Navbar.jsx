import { useState, useEffect  } from "react";
import { Logo, Luna, Sol } from "../icons/Icons";
import "./Navbar.css";


const Navbar = () => {

  const [theme, setTheme] = useState('light');

  const handleChange = (e) => setTheme(e.target.checked ? 'dark' : 'light');

  useEffect(() =>{
    document.body.setAttribute('theme-data',theme);
  },[theme])


  return (
    <nav>
      <Logo />
      <div className="switch">
        <Sol />
        <label>
          <input type="checkbox" className="check-switch" onChange={handleChange} hidden />
          <span className="slider"></span>
        </label>
        <Luna />
      </div>
    </nav>
  );
};

export default Navbar;
