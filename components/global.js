

const component = {
}


export default {
	install(Vue) {
		for (const name in component) {
			Vue.component(name, component[name])
		}
	}
}