import axiox from 'axios';
import qs from 'qs';
import {message} from 'antd';

/*
  请求拦截器,让post请求的请求体格式为urlencode 
*/
axiox.interceptors.request.use((config)=>{
    const {data,method} = config;
    if(method.toLowerCase() === 'post' && typeof data ==='object'){
        config.data = qs.stringify(data);//将data为json格式的数据转换为urlencode形式
    }
    return config;
})

axiox.interceptors.response.use((response)=>{
    console.log(response)
     return response.data;
},(error)=>{
    message.error('请求出错'+error.message);
    //返回一个pending状态的promise,中断promise;
    return new Promise(()=>{})
})

export default axiox;