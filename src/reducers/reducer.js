const INIT_USERS = 'INIT_USERS' 		//登录
const USER_LOGIN = 'USER_LONG' 		//登录
const USER_LOGOUT = 'USER_LOGOUT'	//退出
const USER_REGISTER = 'USER_REGISTER'	//注册
const INIT_CONTACT = 'INIT_CONTACT'	//注册

export default (initData)=>{
	return (state,action)=>{
		if(!state){
			return {
					loginUser:null,
					userList:initData.userList||[],
					contactList:[]
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
				return Object.assign({...state},{loginUser:null,contactList:[]});
			case USER_REGISTER:
				return Object.assign({...state},{loginUser:action.user,userList:[...state.userList,action.user]});
			case INIT_CONTACT:
				return Object.assign({...state},{contactList:action.contactList});
			default:
				return state;
		}
	}
}


export const initUsers=(user,userList)=>{
	return {type:INIT_USERS,user,userList}
}

export const userLogin=(user)=>{
	return {type:USER_LOGIN,user}
}

export const userLogout=()=>{
	return {type:USER_LOGOUT}
}

export const userRegister=(user)=>{
	return {type:USER_REGISTER,user}
}

export const initContact=(contactList)=>{
	return {type:INIT_CONTACT,contactList}
}
