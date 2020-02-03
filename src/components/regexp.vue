<template>
<div>
	<div class="row p-5 title">
		<div class="col text-center">
			<h1>{{ pagetitle }}</h1>
			<p>{{ pagedesc }}</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<h4>エスケープしたい文字列を入力</h4>
			<textarea class="form-control" v-model="input" placeholder="エスケープしたい文字列を入力してください。"></textarea>
		</div>
	</div>
	
	<div class="row p-4">
		<div class="col-12">
			<div class=" border border-white p-4 rounded" >
			
			<h4>オプション</h4>
			<div class="form-check form-check-inline">
			<input type="checkbox" class="form-check-input" id="n" v-model="n" />
			<label class="form-check-label" for="n">
				改行を\nにする
			</label>
			</div>
			<div class="form-check form-check-inline">
			<input type="checkbox" class="form-check-input" id="t" v-model="t" />
			<label class="form-check-label" for="t">
				タブを\tにする
			</label>
			</div>
			</div>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-6 mx-auto">
			<button class="btn btn-primary btn-block" v-on:click="regexp">エスケープ！</button>
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
		regexp(){
			this.result = this.input.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
			if(this.n){
				this.result = this.result.replace(/\n/g, '\\n');
			}
			if(this.n){
				this.result = this.result.replace(/\t/g, '\\t');
			}
		}
	},
	data(){
		return {
			copyelem: 'copyelem',
	  		pagetitle: '',
	  		pagedesc: '',
			input: '',
			result: '',
			n: false,
			t: false
		}
	}
}
</script>

<style scoped>

</style>
