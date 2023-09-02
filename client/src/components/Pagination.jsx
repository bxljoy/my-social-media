import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.postsReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
        // eslint-disable-next-line
    }, [page]);

    return (
        <Pagination 
            sx={{ul: {
                justifyContent: 'space-around',
            }}}
            count={numberOfPages} 
            color="primary"
            variant="outlined"
            page={ Number(page) || 1}
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