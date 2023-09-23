import style from './Error404.module.css';
import Error from '../../Images/Error.jpg';


function Error404() {


  return (
    <div className={style.container}>
      <p className={style.text404}>It seems like you went off track. Error 404</p>
      <img className={style.image} src={Error} alt='Driver photo' />
    </div>
  )
}

export default Error404;