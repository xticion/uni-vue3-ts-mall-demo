import { useMemberStore } from "@/stores";

const baseURL = 'http://localhost:8080';
// 配置拦截器

const httpInterceptor = {
    invoke(options:UniApp.RequestOptions){
        if(!options.url.startsWith("http")){
            // 当请求不为http开头时，进行地址的拼接
            options.url = baseURL + options.url
        }
        // 设置超时时间，默认是60s
        options.timeout =  10000;
        options.header = {
            ...options.header,
            'source-client': 'miniapp',
          }
          // 4. 添加 token 请求头标识
          const memberStore = useMemberStore();
          const token = memberStore.profile?.token
          if (token) {
            options.header.Authorization = token
          }
        // 打印下请求
        console.log(options)
    }
}
uni.addInterceptor('request',httpInterceptor)

// 配置请求返回值类型
interface Data<T>{
    code:string
    msg:string
    result:T
}

// 配置请求函数

export const http = <T>(options:UniApp.RequestOptions)=>{
    return new Promise<Data<T>>((resolve,reject)=>{
        uni.request({
            ...options,
            success(res){
                if(res.statusCode >= 200 && res.statusCode < 300){
                    // 获取数据成功，将结果进行包装并返回
                    resolve(res.data as Data<T>)
                }else if(res.statusCode === 401){
                    // 401错误 清理用户信息，并跳转登陆页
                    userMemberStore().clearProfile();
                    uni.navigateTo({url:'/pages/index/index'});
                    reject(res);
                }else{
                    // 其他错误,进行提示
                    uni.showToast({
                        icon:'none',
                        title:(res.data as Data<T>).msg || '请求错误'
                    })
                    reject(res);
                }
            },
            fail(err){
                uni.showToast({
                    icon:'none',
                    title:'网络错误'
                })
                reject(err)
            }
        })
    })
}