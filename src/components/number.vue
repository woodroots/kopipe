<template>
<div>
	<div class="row p-5 title">
		<div class="col text-center">
			<h1>{{ pagetitle }}</h1>
			<p>{{ pagedesc }}</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col">
			<h3>開始</h3>
			<div class="row align-items-center">
				<div class="col-6">
					<input type="range" class="form-control" v-model="start" min="-100" max="100" />
				</div>
				<div class="col-2">設定値</div>
				<div class="col-4"><input type="text" class="form-control" v-model="start" /></div>
			</div>
		</div>
	</div>
	<div class="row p-4">
		<div class="col">
			<h3>終了</h3>
			<div class="row align-items-center">
				<div class="col-6">
					<input type="range" class="form-control" v-model="end" min="-100" max="100" />
				</div>
				<div class="col-2">設定値</div>
				<div class="col-4"><input type="text" class="form-control" v-model="end" /></div>
			</div>
		</div>
	</div>
	<div class="row p-4">
		<div class="col">
			<h3>増加量</h3>
			<div class="row align-items-center">
				<div class="col-6">
					<input type="range" class="form-control" v-model="add" min="-10" max="10" />
				</div>
				<div class="col-2">設定値</div>
				<div class="col"><input type="text" class="form-control" v-model="add" /></div>
				<div class="col-12">
					<small>マイナスにすると減少していきます。</small>
				</div>
			</div>
		</div>
		
	</div>
	
	
	
	
	<div class="row p-4">
		<div class="col-6 mx-auto">
			<button class="btn btn-primary btn-block" v-on:click="number">連番生成</button>
		</div>
	</div>
	
	<div class="row p-4">
		<div class="col-12">
			<h4>結果（コピペしてご利用ください）</h4>
			<textarea class="form-control" :value="result" readonly id="copyelem"></textarea>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-6 mx-auto">
			<copyBtn v-bind:copyelem="copyelem"></copyBtn>
		</div>
	</div>
</div>
</template>

<script>
export default {
	mounted(){
	  	var cr = this.$router.currentRoute.name;
		this.pagetitle = this.$store.state[cr].title;
		this.pagedesc = this.$store.state[cr].desc;
	},
	methods: {
		number(){
			var num = parseInt(this.start);
			var numResult = this.start.toString(10) + "\n";
			
			var start = parseInt(this.start);
			var add = parseInt(this.add);
			var end = parseInt(this.end);
			
			if(this.add > 0){
				while(num < end){
					if(start > end){
						break;
					}
					num = num + parseInt(add);
					numResult += num.toString(10) + "\n";
				}
			} else if(add < 0 ) {
				while(num > end){
					if(start < end){
						break;
					}
					num = num + parseInt(add);
					
					numResult += num.toString(10) + "\n";
				}
			}
			var numResult = numResult.replace(/\n+$/g,'');
			this.result = numResult;
		}
	},
	data(){
		return {
			copyelem: 'copyelem',
	  		pagetitle: '',
	  		pagedesc: '',
			start: '0',
			end: '10',
			add: '1',
			result: ''
		}
	}
}
</script>

<style scoped>

</style>
