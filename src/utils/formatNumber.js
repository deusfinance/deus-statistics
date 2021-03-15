export const formatUsd = (x) => {
	try {
		const valueParts = x.toString().split('.');
		let value = valueParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		if (valueParts.length > 1) {
			value += '.' + valueParts[1].substring(0, 2);
		}
		return value;
	} catch (e) {
		console.log(e);
		return x.toString();
	}
};