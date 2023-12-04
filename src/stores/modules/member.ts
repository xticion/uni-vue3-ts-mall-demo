import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMemberStore = defineStore(
    'member',
    ()=>{
        const profile = ref();

        const serProfile = (val:any) =>{
            profile.value = val
        }

        const clearProfile = () =>{
            profile.value = undefined
        }

        return {
            profile,
            serProfile,
            clearProfile
        }
    },
    { 
        persist:{
            storage:{
                getItem(key){
                    return uni.getStorageSync(key);
                },
                setItem(key,value){
                    return uni.setStorageSync(key,value);
                }
            }
        }
    }
)