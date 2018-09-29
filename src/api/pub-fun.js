export function conversion(arr){
	var str='';
	for(var item in arr){
		str+='&'+item+'='+arr[item]
	}
	return str.substring(1);
}

export function formatTwoNumber(val){
	if (val<10)
		return '0'+val
	else{
		return val
	}
}