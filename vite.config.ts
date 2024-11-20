import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// script name 配置
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// Icons 配置
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// ElementPlus配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

// gzip压缩
import viteCompression from 'vite-plugin-compression'
// 图片压缩
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression(),
    ViteImageOptimizer(),
    // vue3：script-setup的name方案
    VueSetupExtend(),
    // element-plus自动导入
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 相关函数
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    // element-plus自动注册
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    }),
    // svg插件
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [fileURLToPath(new URL('./src/assets/svg', import.meta.url))],
      // iconDirs: [resolve(__dirname, './assets/svg')],
      // 执行 icon name 的格式
      symbolId: 'icon-[name]'
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  },
  // 预编译，增加访问速度，针对node_modules
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      'echarts',
      'element-plus/es/components/text/style/css',
      'element-plus/es/components/collapse-item/style/css',
      'element-plus/es/components/collapse/style/css',
      'element-plus/es/components/space/style/css',
      'element-plus/es/components/container/style/css',
      'element-plus/es/components/aside/style/css',
      'element-plus/es/components/main/style/css',
      'element-plus/es/components/header/style/css',
      'element-plus/es/components/button-group/style/css',
      'element-plus/es/components/radio-button/style/css',
      'element-plus/es/components/checkbox-group/style/css',
      'element-plus/es/components/form/style/css',
      'element-plus/es/components/form-item/style/css',
      'element-plus/es/components/button/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/input-number/style/css',
      'element-plus/es/components/switch/style/css',
      'element-plus/es/components/upload/style/css',
      'element-plus/es/components/menu/style/css',
      'element-plus/es/components/col/style/css',
      'element-plus/es/components/icon/style/css',
      'element-plus/es/components/row/style/css',
      'element-plus/es/components/tag/style/css',
      'element-plus/es/components/dialog/style/css',
      'element-plus/es/components/loading/style/css',
      'element-plus/es/components/radio/style/css',
      'element-plus/es/components/radio-group/style/css',
      'element-plus/es/components/popover/style/css',
      'element-plus/es/components/scrollbar/style/css',
      'element-plus/es/components/tooltip/style/css',
      'element-plus/es/components/dropdown/style/css',
      'element-plus/es/components/dropdown-menu/style/css',
      'element-plus/es/components/dropdown-item/style/css',
      'element-plus/es/components/sub-menu/style/css',
      'element-plus/es/components/menu-item/style/css',
      'element-plus/es/components/divider/style/css',
      'element-plus/es/components/card/style/css',
      'element-plus/es/components/link/style/css',
      'element-plus/es/components/breadcrumb/style/css',
      'element-plus/es/components/breadcrumb-item/style/css',
      'element-plus/es/components/table/style/css',
      'element-plus/es/components/tree-select/style/css',
      'element-plus/es/components/table-column/style/css',
      'element-plus/es/components/select/style/css',
      'element-plus/es/components/option/style/css',
      'element-plus/es/components/pagination/style/css',
      'element-plus/es/components/tree/style/css',
      'element-plus/es/components/alert/style/css',
      'element-plus/es/components/checkbox/style/css',
      'element-plus/es/components/date-picker/style/css',
      'element-plus/es/components/transfer/style/css',
      'element-plus/es/components/tabs/style/css',
      'element-plus/es/components/image/style/css',
      'element-plus/es/components/tab-pane/style/css'
    ]
  }
})
