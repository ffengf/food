


import { ElMessage } from "element-ui/types/message";
import { ElMessageBoxShortcutMethod } from 'element-ui/types/message-box';
import { ElNotification } from 'element-ui/types/notification';

declare module 'vue/types/vue' {
	interface Vue {
		$message: ElMessage,
		$alert: ElMessageBoxShortcutMethod,
		$notify: ElNotification,
	}
}


export type Id = number | string;

export enum user_level {
	root = 1,
	admin = 0,
}
