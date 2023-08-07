import { combineReducers } from "redux";
import {postsReducer} from './posts';
import auth from "./auth";

export default combineReducers({ postsReducer, auth });