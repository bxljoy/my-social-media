import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

const Paginate = () => {
    return (
        <Pagination 
            sx={{ul: {
                justifyContent: 'space-around',
            }}}
            count={5} 
            color="primary"
            variant="outlined"
            page={1}
            renderItem={(item) => (
                <PaginationItem 
                    {...item}
                    component={ Link }
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    );
}

export default Paginate;