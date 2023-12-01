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
        // 打印下请求
        console.log(options)
    }
}
uni.addInterceptor('request',httpInterceptor)