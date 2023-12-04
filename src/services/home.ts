import type { PageParams,PageResult } from "@/types/global"
import type { GuessItem, SwiperItem } from "@/types/home"
import { http } from "@/utils/http"


export const getSwiperAPI = (distributionSite = 1)=>{
    return http<SwiperItem[]>({
        method:'GET',
        url:'/home/banner',
        data:{
            distributionSite
        }
    })
}

// 获取猜你喜欢的商品数据
export const getHomeGoodsGuessLikeAPI  = (data?:PageParams)=>{
    return http<PageResult<GuessItem>>({
        method:'GET',
        url:'/home/goods/guessLike',
        data:data
    })
}