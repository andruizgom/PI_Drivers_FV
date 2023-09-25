import style from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { NavLink, useLocation } from 'react-router-dom';



function NavBar() {
  const location = useLocation();


  return (
    <div className={style.container}>

      {
        location.pathname !== '/home' ? <button className={style.button} ><NavLink className={style.navLink} to='/home'>Home</NavLink></button> : null
      }

      {
        location.pathname !== '/form' ? <button className={style.button} ><NavLink className={style.navLink} to='/form'>Create Driver</NavLink></button> : null
      }

      {
        location.pathname === '/home' ? <SearchBar className={style.searchBar} /> : null
      }


    </div>
  )
}

export default NavBar;