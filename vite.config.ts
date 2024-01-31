import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'; 
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: 
  	[
		vue(),
		Unocss(), 
		AutoImport({
			imports: ['vue',{ 'vue/macros': ['$ref'] },'vue-router'],
			dirs: [
				'./src/composables',
				'./src/store/modules',
			],
			vueTemplate: true,
		}),
		Components({
			dts: true, // 对全局组件生成ts声明
			extensions: ['vue', 'tsx'],
			directoryAsNamespace: true, // 使用文件夹名为组件前缀
			resolvers:[] // ui库
		})
	],
  resolve: {
		alias: {
			'@': path.resolve('./src'),
		},
	},
  server: {
		port: 5500,
		host: true,
		proxy: {
			'/api': {
				target: 'http://jsonplaceholder.typicode.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})
