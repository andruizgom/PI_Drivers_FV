import style from './Home.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrivers, getTeams } from '../../redux/actions';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';


function Home() {

  const { drivers, teams } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [driversPerPage, setDriversPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const finalIndex = currentPage * driversPerPage;
  const initialIndex = finalIndex - driversPerPage;

  const driversToShow = drivers.slice(initialIndex, finalIndex)
  const totalPages = Math.ceil(drivers.length / driversPerPage)


  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllDrivers());
        await dispatch(getTeams());
      } catch (error) {
        alert("There is no data")
      }
    })();

  }, []);


  return (
    <div className={style.container}>
      <Cards driversToShow={driversToShow} setCurrentPage={setCurrentPage} teams={teams} />
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export default Home;
