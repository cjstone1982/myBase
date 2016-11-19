import { applyMiddleware, createStore ,compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger'
import reducers from './reducers';

const options={
	level: 'info',
	duration:true,
	diff:false,  //是否显示改变的state
}
const logger = createLogger(options);

export default (initialState) => {
	let middleware=applyMiddleware(thunk, promise, logger)
	return compose(middleware)(createStore)(reducers, initialState);
};