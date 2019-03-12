const INIT_USERS = 'INIT_USERS'		//初始化人员信息
const USER_LOGIN = 'USER_LONG' 		//登录
const USER_LOGOUT = 'USER_LOGOUT'	//退出
const USER_REGISTER = 'USER_REGISTER'	//注册

const INIT_CONTACT = 'INIT_CONTACT'	//初始化联系人
const SELECT_CONTACT = 'SELECT_CONTACT'	//选择联系人
const ADD_CONTACT = 'ADD_CONTACT'	//新增联系人
const DELETE_CONTACT = 'DELETE_CONTACT'	//删除联系人

const INIT_RECORD = 'INIT_RECORDS'	//初始化聊天记录
const ADD_RECORD = 'ADD_RECORD'	//新增聊天记录
const DELETE_RECORD = 'DELETE_RECORD'	//删除聊天记录
const DELETE_RECORDLIST = 'DELETE_RECORDLIST'	//批量删除聊天记录

export default (initData)=>{
	return (state,action)=>{
		if(!state){
			return {
					loginUser:null,
					userList:initData.userList||[],
					contactList:[],
					currentContact:null,
					records:[]
				}
		}
		switch(action.type){
			case INIT_USERS:
				return Object.assign({...state},{loginUser:action.user,userList:action.userList});
			case USER_LOGIN:
				let u = {...action.user,online:true}
				let uList = state.userList.map((item)=>{
					return item.id == u.id ? u : item
				})
				return Object.assign({...state},{loginUser:u,userList:uList});
			case USER_LOGOUT:
				return Object.assign({...state},{loginUser:null,contactList:[],records:[]});
			case USER_REGISTER:
				return Object.assign({...state},{loginUser:action.user,userList:[...state.userList,action.user]});
			case INIT_CONTACT:
				return Object.assign({...state},{contactList:action.contactList});
			case ADD_CONTACT:
				return Object.assign({...state},{contactList:[state.contactList,action.contact]});
			case SELECT_CONTACT:
				return Object.assign({...state},{currentContact:action.contact})
			case INIT_RECORD:
				return Object.assign({...state},{records:action.records});
			case ADD_RECORD:
				return Object.assign({...state},{records:[...state.records,action.record]});
			case DELETE_RECORD:
				return Object.assign({...state},
					{contactList:state.records.filter((record)=>record.id != action.recoredid)});
			case DELETE_RECORDLIST:
				let idset = new Set(action.recordlist.map((itm)=>itm.id));
				return Object.assign({...state},
					{contactList:state.records.filter((record)=>!idset.has(record.id))});
			default:
				return state;
		}
	}
}

//初始化人员
export const initUsers=(user,userList)=>{
	return {type:INIT_USERS,user,userList}
}

//用户登录
export const userLogin=(user)=>{
	return {type:USER_LOGIN,user}
}

//用户登出
export const userLogout=()=>{
	return {type:USER_LOGOUT}
}

//用户注册
export const userRegister=(user)=>{
	return {type:USER_REGISTER,user}
}

//初始化联系人
export const initContact=(contactList)=>{
	return {type:INIT_CONTACT,contactList}
}

//选择联系人
export const selectContact=(contact)=>{
	return {type:SELECT_CONTACT,contact}
}

//新增联系人
export const addContact=(contact)=>{
	return {type:ADD_CONTACT,contact}
}

//删除联系人
export const deleteContact=(contactid)=>{
	return {type:DELETE_CONTACT,contactid}
}

//初始化聊天记录
export const initRecord=(records)=>{
	return {type:INIT_RECORD,records}
}
//新增聊天记录
export const addRecord=(record)=>{
	return {type:ADD_RECORD,record}
}
//删除聊天记录
export const deleteRecord=(recordid)=>{
	return {type:DELETE_RECORD,recordid}
}
//批量删除聊天记录
export const deleteRecordList=(recordlist)=>{
	return {type:DELETE_RECORDLIST,recordlist}
}
