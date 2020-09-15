


import { Loading } from 'element-ui'
import { ElLoadingComponent } from 'element-ui/types/loading';

let that:Load|null = null

class Load {
	protected loadingCount: number = 0;
	protected loading: ElLoadingComponent|undefined = undefined;

	constructor(){
		if(that === null){
			that = this
		}
		return that
	}

	protected startLoading() {
		this.loading = Loading.service({
			lock: true,
			text: '拼命加载中……',
			background: 'rgba(0, 0, 0, 0.7)'
		});
	}

	protected endLoading() {
		this.loading?.close();
	}

	public showLoading() {
		if (this.loadingCount === 0) {
			this.startLoading();
		}
		this.loadingCount += 1;
	}

	public hideLoading() {
		if (this.loadingCount <= 0) {
			return;
		}
		this.loadingCount -= 1;
		if (this.loadingCount === 0) {
			this.endLoading();
		}
	}

	static create(){
		return new Load()
	}
}

export const loadding =  Load.create()
