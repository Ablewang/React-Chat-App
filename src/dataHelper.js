const data = {}
export default (initData)=>{
	Object.assign(data,initData);
	return data;
}
export const searchUser=(prop,value)=>{
	return data.userList.find((user)=>user[prop]==value);
}
export const createUser=(user)=>{
	let max = -1;
	data.userList.forEach((u)=>{
		max = max > u.id ? max : u.id;
	})
	Object.assign(user,{id:max+1, online:false,lastMessasge:''})
	data.userList.push(user);
	return user;
}

export const searchContact=(userid)=>{
	let relation = data.userRelation.reduce((res,cur)=>{
		cur.userId == userid && res.push(cur.contactId)
		return res;
	},[])
	return data.userList.filter((itm)=>{
		return relation.indexOf(itm.id) >= 0
	})
}

export const searchRecords=(userid,contactid)=>{
	return data.records.filter((itm)=>{
		return (itm.from == userid && itm.to == contactid) 
			|| (itm.to == userid && itm.from == contactid) 
	})
}

export const createRecord = (f,t,content)=>{
	let max = -1;
	data.records.forEach((itm)=>{
		max = itm.id > max ? itm.id : max
	})
	let record = {
		id:++max,
		from:f,
		to:t,
		content:content,
		date:+new Date()
	}
	data.records.push(record)
	return record;
}