const INIT_USERS = 'INIT_USERS' 		//登录
const USER_LOGIN = 'USER_LONG' 		//登录
const USER_LOGOUT = 'USER_LOGOUT'	//退出
const USER_REGISTER = 'USER_REGISTER'	//注册

export default (state, action) => {
	if (!state) return { logintimes: 0 }
	switch (action.type) {
		case INIT_USERS:
			return Object.assign(state, { loginUser: action.user, userList: action.userList });
		case USER_LOGIN:
			return Object.assign(state, { loginUser: action.user });
		case USER_LOGOUT:
			return Object.assign(state, { loginUser: null });
		case USER_REGISTER:
			return Object.assign(state, {
				loginUser: action.user,
				userList: [...state.userList, action.user]
			});
		default:
			return state;
	}
}

export const initUsers = (user, userList) => {
	return { type: INIT_USERS, user, userList }
}

export const userLogin = (user) => {
	return { type: USER_LOGIN, user }
}

export const userLogout = () => {
	return { type: USER_LOGOUT }
}

export const userRegister = (user) => {
	return { type: USER_REGISTER, user }
}