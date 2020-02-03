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
			<h4>濁点を入れたい文字列を入力</h4>
			<textarea class="form-control" v-model="input" placeholder="エスケープしたい文字列を入力してください。"></textarea>
		</div>
	</div>
	
	
	<div class="row p-4">
		<div class="col-6 mx-auto">
			<button class="btn btn-primary btn-block" v-on:click="tatsuya">へ゛ん゛か゛ん゛！！</button>
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
	name: 'tatsuya',
	mounted(){
	  	var cr = this.$router.currentRoute.name;
		this.pagetitle = this.$store.state[cr].title;
		this.pagedesc = this.$store.state[cr].desc;
	},
	methods: {
		tatsuya(){
			this.result = this.input.replace(/([あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんヲァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン])/g, '$1゛');
		}
	},
	data(){
		return {
			copyelem: 'copyelem',
	  		pagetitle: '',
	  		pagedesc: '',
			input: '',
			result: ''
		}
	}
}
</script>

<style scoped>

</style>
