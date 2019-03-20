import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import initData from './dataHelper'
import reducerCreator from './reducers/reducer'
import data from './resource/data/data.json'
import './common'

const func = ()=>{
	const content = ['啊哈哈哈哈', '呵呵呵呵呵呵', '内容内容内容内容内容', '啊asdf内容内容内容内容内容哈哈内容内容内容内容内容哈哈', '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵', '内容内容内容内容内容', 'ReactReactReactReact 内容内容内容内容内容']
	const random = 40
	let records = []
	let date = +new Date()
	for (let i = 10000; i < 20000; i++) {
		let f = Math.random() > 0.4 ? 0 : 1;
		let temp = {
			id: i,
			from: f,
			to: f == 1 ? 0 : 1,
			content: content[parseInt(Math.random() * content.length)],
			date: date + random * 1000
		};
		records.push(temp)
		date = temp.date
	}
	console.log(records)
	return records
}
data.records.push(...(func()))
initData(data)
let r = data.userRelation.reduce((res,itm)=>{
	let arr = data.userRelation.filter((i)=>{
		return i.contactId === itm.userId && itm.contactId === i.userId
	})
	!res[itm.userId] && (res[itm.userId] = [])
	res[itm.userId].push(arr)
	return res
},{})
console.log(r )

const store = createStore(reducerCreator(data))
ReactDOM.render(<Provider store={store}>
	<App />
</Provider>,
	document.getElementById('root'));

