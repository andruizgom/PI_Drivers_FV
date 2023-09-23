import style from './SearchBar.module.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getDriversByName } from '../../redux/actions';

function SearchBar() {

   const [forename, setForename] = useState("");

   const handleChange = (event) => {
      setForename(event.target.value);
   }
   const dispatch = useDispatch();

   const onSearch = async (forename) => {
      try {
         await dispatch(getDriversByName(forename));
      } catch (error) {
         alert("There are no drivers with that name")
      }
   };

   return (
      <div className={style.container}>
         <input className={style.searchBarInput} type='search' onChange={handleChange} value={forename} />
         <button className={style.searchBarButton} onClick={() => { onSearch(forename); setForename("") }}>Search</button>
      </div>
   );
}

export default SearchBar;

