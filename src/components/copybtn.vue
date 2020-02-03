<template>
<div>
	<button class="btn btn-warning btn-block" v-on:click="copy($event,copyelem)">クリックしてコピー</button>
	<div class="alert alert-info" role="alert"></div>
</div>
</template>

<script>
export default {
	methods: {
		copy(e,copyelem){
		var string = document.getElementById(copyelem).value;
		var temp = document.createElement('div');
		  temp.appendChild(document.createElement('pre')).textContent = string;

		  var s = temp.style;
		  s.position = 'fixed';
		  s.left = '-100%';

		  document.body.appendChild(temp);
		  document.getSelection().selectAllChildren(temp);

		  var result = document.execCommand('copy');

		  document.body.removeChild(temp);
		  
		  if(result){
			var msg = 'クリップボードにコピーされました。';
		  } else {
			var msg = 'コピーに失敗しました。';
		  }
		  var alert = e.currentTarget.nextElementSibling;
		  alert.classList.add('show');
		  alert.textContent = msg;
		  setTimeout(function(){
			alert.classList.remove('show');
			alert.textContent = '';
		  },1200);
		
		}
	},
	props: ['copyelem']
}
</script>

<style scoped>
</style>
