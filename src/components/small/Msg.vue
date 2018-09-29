<template>
	<div class="alert">
		<p>{{ message }}</p>
	</div>
</template>

<script>
	export default{
		name:'Msg',
		props:["message"]
	}
</script>