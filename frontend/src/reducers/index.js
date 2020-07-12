import {combineReducers} from 'redux';
import * as ArticleReducers from './ArticleReducers';

//
// combine all the redux reducers with combineReducers
//

export default combineReducers(ArticleReducers);