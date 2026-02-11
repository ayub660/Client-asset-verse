import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    if (totalPages <= 1) return null;

    const pages = [...Array(totalPages).keys()];

    return (
        <div className="flex justify-center items-center mt-10 gap-2 pb-10">
            <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-sm btn-outline btn-primary"
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`btn btn-sm ${currentPage === page ? "btn-primary text-white" : "btn-outline btn-primary"
                        }`}
                >
                    {page + 1}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-sm btn-outline btn-primary"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;