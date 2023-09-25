import style from './Cards.module.css';
import Card from '../Card/Card';
import { useDispatch } from 'react-redux';
import { filterDrivers, orderDrivers } from '../../redux/actions';
import { useLocation } from 'react-router-dom';


function Cards({ driversToShow, teams, setCurrentPage }) {
   const location = useLocation();

   const dispatch = useDispatch();

   const handleOrder = (event) => {

      dispatch(orderDrivers(event.target.value));
   }

   const handleFilter = (event) => {

      dispatch(filterDrivers(event.target.value));
      setCurrentPage(1)
   }


   return (
      <div className={style.container}>

         <div className={style.OrderAndFilter}>
            <select className={style.Order} onChange={handleOrder}>
               <option className={style.select} value="Default">Select Order</option>
               <option className={style.orderOption} value="Default">Restore default values</option>
               <option className={style.orderOption} value="A Alphabetical">Ascending alphabetically</option>
               <option className={style.orderOption} value="D Alphabetical">Descending alphabetically</option>
               <option className={style.orderOption} value="A Birthdate">Ascending birthdate</option>
               <option className={style.orderOption} value="D Birthdate">Descending birthdate</option>
            </select>

            <select className={style.Filter} onChange={handleFilter}>
               <option className={style.filterOption} value="Default">Select Filter</option>
               <option className={style.filterOption} value="Default">Restore default values</option>
               <option className={style.filterOption} value="Database ID">Database ID</option>
               <option className={style.filterOption} value="API ID">API ID</option>
               {teams?.map(team => {

                  return (
                     <option key={team.id} value={team.name}>{team.name}</option>
                  )
               })}
            </select>
         </div>
         <div className={style.cards}>
            {driversToShow?.map(driver => {

               return (
                  <Card
                     key={driver.id}
                     driver={driver}
                  />
               )
            })}

         </div>

      </div>
   )
}

export default Cards;