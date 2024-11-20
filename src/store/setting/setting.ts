import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import { THEME_CLASS } from '@/global/constants'

interface ISettingState {
  themeClass: string
}

const useSettingStore = defineStore('setting', {
  state: (): ISettingState => ({
    themeClass: localCache.getCache(THEME_CLASS) ?? 'theme-white'
  }),
  actions: {}
})

export default useSettingStore
