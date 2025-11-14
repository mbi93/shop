import type { FC } from "react";
import ReactPaginate from "react-paginate";
import s from './pagination.module.scss'
import type { IPage } from "../../types";

interface IPaginationProps {
    totalCount: number,
    changePage: (page: IPage)=>void,
    currentPage: number,
    limit: number
}

const Pagination: FC<IPaginationProps> = ({totalCount, changePage, currentPage, limit}) => {
    const totalPage = Math.ceil( totalCount / limit );
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={changePage}
      pageRangeDisplayed={3}
      pageCount={totalPage}
      previousLabel="<"
      className={s.pagination}
      activeLinkClassName={s.active}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
