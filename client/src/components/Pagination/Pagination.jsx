import style from './Pagination.module.css';

function Pagination({ setCurrentPage, currentPage, totalPages }) {

    const next = () => {
        if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
    }
    const previous = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }



    return (
        <div className={style.container}>
            <h3 className={style.pageChange} onClick={previous}>🢀 Previous </h3>
            <h3 className={style.pageChange}>Page {currentPage} of {totalPages}</h3>
            <h3 className={style.pageChange} onClick={next}>Next 🢂</h3>

        </div>
    );
}

export default Pagination