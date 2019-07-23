import storageUtils from "./storageUtils"

const user=storageUtils.getUser();
export default {
  // 用来存储登陆用户的信息, 初始值为local中读取的user
  user,
  product:{} ,//用来存储商品的信息
}