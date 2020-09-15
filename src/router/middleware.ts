

import { UserModule } from '@/model/user';
import router from './index';


router.beforeEach((to, _, next) => {
	if (to.meta.without_auth === true) {
		return next()
	} else {
		if (UserModule.token !== null) {
			return next()
		} else {
			UserModule.logout()
			return next('/login')
		}
	}
})
