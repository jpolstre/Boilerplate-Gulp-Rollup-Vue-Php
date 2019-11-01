import Vue from 'vue/dist/vue'
import AppHeader from './components/AppHeader.vue'
import AppBody from './components/AppBody.vue'
import AppFooter from './components/AppFooter.vue'
import '../css/main.css'

new Vue({
	el: '#home',
	components: {
		AppHeader,
		AppBody,
		AppFooter
	},
	mounted() {
		// alert('main app mounted')
	}
})
