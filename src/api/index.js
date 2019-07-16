import ajax from './ajax'

const BASE='';
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})

// export const reqLogin=(username,password)=>(
//      ajax({
//             method:'post',
//             url: BASE+'/login',
//             data:{
//                 username,
//                 password,
//             }
//         })
// )
