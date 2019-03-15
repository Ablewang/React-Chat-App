const data = {}
export default (initData) => {
	Object.assign(data, initData);
	return data;
}
export const searchUser = (prop, value, isFuzzy) => {
	let res = searchUserList(prop, value, isFuzzy)
	return res && res.length ? res[0] : null
}
export const searchUserList = (prop, value, isFuzzy) => {
	return data.userList.filter((user) => (!isFuzzy ? user[prop] === value : user[prop].indexOf(value) >= 0));
}
export const createUser = (user) => {
	let max = -1;
	data.userList.forEach((u) => {
		max = max > u.id ? max : u.id;
	})
	Object.assign(user, { id: max + 1, online: false, lastMessasge: '' })
	data.userList.push(user);
	return user;
}

export const searchContact = (userid) => {
	return { contact: getContact(userid), stranger: getStranger(userid) }
}
export const getContact = (userid) => {
	let relation = data.userRelation.reduce((res, cur) => {
		cur.userId === userid && res.push(cur.contactId)
		return res;
	}, [])
	return data.userList.filter((itm) => {
		return relation.indexOf(itm.id) >= 0
	})
}
export const getStranger = (userid) => {
	let relation = data.userRelation.reduce((res, cur) => {
		cur.userId === userid && res.contact.add(cur.contactId) //自己的联系人
		cur.contactId === userid && res.all.add(cur.userId)		//联系人有自己的用户
		return res;
	}, { contact: new Set(), all: new Set() })
	//去差值
	let diff = new Set(Array.from(relation.all).filter((itm) => !relation.contact.has(itm)))
	return data.userList.filter((itm) => {
		return diff.has(itm.id)
	})

}

export const searchRecords = (userid, contactid) => {
	return data.records.filter((itm) => {
		return (itm.from === userid && itm.to === contactid)
			|| (itm.to === userid && itm.from === contactid)
	})
}

export const createRecord = (f, t, content) => {
	let max = -1;
	data.records.forEach((itm) => {
		max = itm.id > max ? itm.id : max
	})
	let record = {
		id: ++max,
		from: f,
		to: t,
		content: content,
		date: +new Date()
	}
	data.records.push(record)
	return record;
}

export const getRelation = (userid, contactid) => {
	return data.userRelation.filter((itm)=> itm.userId === userid && itm.contactId ===contactid)
}
export const createRelation = (userid, contactid) => {
	let max = -1;
	data.userRelation.forEach((itm) => {
		max = itm.id > max ? itm.id : max
	})
	let relation = {
		id: ++max,
		userId: userid,
		contactId: contactid,
		date: +new Date()
	}
	data.userRelation.push(relation)
	return relation;
}
export const deleteRelation = (userid, contactid, isStranger) => {
	data.userRelation = data.userRelation.filter((itm)=>{
		return !isStranger ? (itm.userId !== userid || itm.contactId !== contactid)
							: (itm.userId !== contactid || itm.contactId !== userid)
	})
}

