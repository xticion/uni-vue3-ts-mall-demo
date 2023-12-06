import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LoginResult } from '@/types/member'

export const useMemberStore = defineStore(
  'member',
  () => {
    const profile = ref<LoginResult>()

    const setProfile = (val: any) => {
      profile.value = val
    }

    const clearProfile = () => {
      profile.value = undefined
    }

    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          return uni.setStorageSync(key, value)
        },
      },
    },
  },
)
