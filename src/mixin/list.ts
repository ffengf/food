

import { Vue, Component, Watch } from "vue-property-decorator";
import { clean } from '@/util/object';
import { list } from '@/http/base';
import { parmas } from "@/types/global"


interface Id {
	id: number | string
}


type axios_get<T> = <G extends parmas>(filter:G) => Promise<list<T>>


export const Mixin_list = <T extends Id>(axios_get: axios_get<T>) => {
	// @ts-ignore
	@Component
	abstract class Mixin_list extends Vue {
		list: T[] = [];
		total: number = 0;
		page_size: number = 10;
		page: number = 1;
		selete: T[] = [];
		ordering: string = '';

		abstract filter: Record<string, any>

		allSelect(val: T[]) {
			this.selete = val
		}

		sort_change({ prop, order }: Record<string, string>) {//ascending 升 id
			if (order === null) {
				this.ordering = ''
				return
			}
			this.ordering = order === "ascending" ? prop : `-${prop}`;
		}

		get get_select() {
			return this.selete.map(x => x.id)
		}

		find(){
			if(this.page === 1){
				this.get_list()
			}else{
				this.page = 1
			}
		}

		@Watch('page_size')
		@Watch('page')
		async get_list() {
			const { page, page_size, ordering } = this
			const data = clean({ page, ordering, page_size, ...this.filter })
			const { count, results } = await axios_get(data)
			this.total = count
			this.list = results
		}

		created() {
			this.get_list()
		}
	};
	return Mixin_list
}
