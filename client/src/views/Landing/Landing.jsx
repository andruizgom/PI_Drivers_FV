import style from './Landing.module.css';
import Ferrari from '../../Images/Ferrari.gif';
import Logo from '../../Images/Logo.jpg';
import { NavLink } from 'react-router-dom';

function Landing() {


  return (
    <div className={style.container}>

      <h1>"73 years of speed, innovation and passion remind us that dreams are the fuel for greatness"</h1>
      <img className={style.Ferrari} src={Ferrari} alt='Ferrari' />
      <NavLink className={style.navLink} to='/home'><img className={style.Logo} src={Logo} alt='Logo' /></NavLink>
      <div className={style.screen}></div>

    </div>
  )
}

export default Landing;