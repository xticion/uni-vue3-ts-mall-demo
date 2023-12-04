import type { SwiperItem } from "@/types/home"
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