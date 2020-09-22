//笛卡尔积
export function aggregate<T>(...arr: T[][]): T[][] {
	// if (arr.length < 2) return arr[0] || [];
	return arr.reduce(function (last, ele): any {
		const res: T[] | T[][] = [];
		last.forEach((c: T | T[]) => {
			ele.forEach(s => {
				const t = Array.isArray(c) ? [...c] : [c]
				t.push(s);
				res.push(t as any);
			})
		});
		return res;
	}, [[]]) as T[][]
}


