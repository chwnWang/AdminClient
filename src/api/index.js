import ajax from './ajax';
import jsonp from 'jsonp';

const BASE='';
/*登录接口 */
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})

/**获取天气 */
export function reqWeather(city) {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: 'callback'
      }, (error, response) => {
        if (!error && response.status == 'success') {
          const {dayPictureUrl, weather} = response.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        } else {
          alert('获取天气信息失败')
        }
      })
    })
  }
/**获取品类分页列表 */
export const reqCategorys = () =>  ajax(BASE + '/manage/category/list')
/**添加品类 */
export const addCategory = ( categoryName )=> ajax.post(BASE+'./manage/category/add',{categoryName})
/**修改品类 */
export const updateCategory = ( categoryId,categoryName  )=>ajax.post(BASE+'./manage/category/update',{categoryId,categoryName})

/**获取商品分类列表 */
export const reqProducts = (pageNum,pageSize)=>ajax(BASE+'./manage/product/list',{
    params: {
      pageNum,
      pageSize
    }
}); 
/**添加商品 */
export const reqAddUpdateProduct = (product) => ajax.post(
  BASE + '/manage/product/' + (product._id ? 'update' : 'add'), 
  product
)

/**根据商品名称和商品描述进行分页搜索 */
export const reqProductsSearch = (pageNum,pageSize,searchName,searchType)=> ajax(BASE+' /manage/product/search',{
  params:{
    pageNum,
    pageSize,
    [searchType]:searchName
  }
})
/**进行上下架操作 */
export const  reqUpdateStatus = (productId,status)=>ajax.post(BASE+'/manage/product/updateStatus',{
  productId,
  status
})
/**根据categroyId查询 */
export const reqCategory =(categoryId)=>ajax(BASE+'/manage/category/info',{
  params: {
    categoryId
  }
})
/**删除图片 */
export const reqDeleteImg = (name) => ajax.post(BASE + '/manage/img/delete', {name})

/**查询所有用户的信息 */

export const reqUsers =()=>ajax(BASE+'/manage/user/list');

/**添加用户更新用户 */
export const reqAddOrUpdateUser = (user) =>ajax.post(BASE + '/manage/user/' + (user._id ? 'update' : 'add'),user)
/**删除用户 */
export const reqDeleteUser = (userId)=>ajax.post(BASE+'/manage/user/delete',{userId})

// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax.post(BASE + '/manage/role/add', {
  roleName
})
// 更新角色
export const reqUpdateRole = (role) => ajax.post(BASE + '/manage/role/update', role)





