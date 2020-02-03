<template>
<div>
	<div class="row p-5 title">
		<div class="col">
			<h1>URL一覧からタイトルを取得</h1>
			<p>URLの一覧から&lt;title&gt;を取得し、出力します</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<h4>URL一覧を入力</h4>
			<textarea class="form-control" v-model="input"></textarea>
		</div>
	</div>
	
	
	
	
	<div class="row p-4">
		<div class="col-6 mx-auto">
			<button class="btn btn-primary btn-block" v-on:click="gettitle" :disabled="progress">タイトルを取得</button>
		</div>
	</div>
	
	<div class="row p-4">
		<div class="col">
		<div class="progress">
			<div class="progress-bar" role="progressbar" v-bind:style="{width: bar + '%'}"></div>
		</div>
	</div>

	</div>
	
	<div class="row p-4">
		<div class="col-12">
			<h4>結果（コピペしてご利用ください）</h4>
			<textarea class="form-control" :value="result" readonly></textarea>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'urltotitle',
	methods: {
		gettitle(){
			var vm = this;
			if(vm.progress) return;
			vm.progress = true;
			
			var input = this.input.split("\n");
			
			input.forEach(function(elem,i){
				if(!elem){
					input.splice(i,1);
				}
			});
			console.log(input.length);
			
			vm.bar = 0;
			
			var num = input.length;
			vm.result = '';
			input.forEach(function(elem,i){
				if(elem){
					setTimeout(function(){
					var params = new URLSearchParams();
					params.append('url',elem);
					
					axios({
						method: 'POST',
						url: 'https://wood-roots.com/sample/title.php',
						data: params,
						responseType: 'document',
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).then(function(response){
						var title = response.data.head.innerHTML.match(/<title>(.*?)<\/title>/gi);
						var title = title[0].replace(/<(\/*?)title>/gi,'');
						vm.result += elem + ',' + title + "\n";
						
						vm.bar = 100 * (i + 2) / num;
						
					});
					},500);
				}
			});
			vm.progress = false;
			
		}
	},
	data(){
		return {
			bar: 0,
			input: '',
			result: '',
			progress: false
		}
	}
}
</script>

<style scoped>

</style>
