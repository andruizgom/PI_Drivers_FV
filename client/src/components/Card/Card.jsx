import style from './Card.module.css';
import { NavLink } from 'react-router-dom';

function Card({ driver }) {

   let imageToShow = driver?.image

   if (driver?.image?.data) {

      const byteArray = new Uint8Array(driver?.image?.data);
      const blob = new Blob([byteArray], { type: 'image/png' });
      imageToShow = URL.createObjectURL(blob);
   }

   return (
      <div className={style.container}>

         <img className={style.image} src={imageToShow} alt='Driver photo' />
         <NavLink to={`/detail/${driver.id}`}><h2 className={style.forename}>{driver.forename}</h2></NavLink>
         <h2 className={style.teams}>{driver.teams}</h2>
         <h2 className={style.dob}>{driver.dob}</h2>

      </div>
   );
}

export default Card;
