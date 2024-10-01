import { HiOutlineArrowRight ,HiOutlineArrowLeft } from "react-icons/hi2";
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, handlePageClick }) => {
    return (
        <div>
            <ReactPaginate
            previousLabel={
                <div className="flex-grow flex items-center justify-start cursor-pointer font-bold">
                    <HiOutlineArrowLeft size={20} />
                    <button type="button" className='font-normal text-base ml-2'>Previous</button>
                </div>
            }
            nextLabel={
                <div className="flex-grow flex items-center justify-end cursor-pointer font-bold">
                    <button className='font-normal text-base mr-2'>Next</button>
                    <HiOutlineArrowRight size={20} />
                </div>
            }
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'flex items-center w-full space-x-2'}
            activeClassName={'border-[#D9F99D] border border-solid'}
            previousClassName={'flex justify-start flex-grow'} 
            nextClassName={'flex justify-end flex-grow'} 
            breakClassName={'mx-2'}
            pageClassName={'bg-[#fff] rounded   w-10 h-10 flex items-center justify-center rounded'}
        />
        </div>
    );
};

export default Pagination;
