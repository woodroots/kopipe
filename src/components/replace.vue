<template>
<div>
	<div class="row p-5 title">
		<div class="col">
			<h1>CSVを整形</h1>
			<p>カンマ区切りテキストを雛形に従って整形します。</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<h4>カンマ区切りテキストを入力</h4>
			<textarea class="form-control" v-model="csv"></textarea>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<h4>雛形を入力</h4>
			<textarea class="form-control" v-model="template"></textarea>
		</div>
	</div>
	
	
	<div class="row p-4">
		<div class="col-6 mx-auto">
			<button class="btn btn-primary btn-block" v-on:click="replace">変換</button>
		</div>
	</div>
	
	<div class="row p-4">
		<div class="col-12">
			<h4>結果（コピペしてご利用ください）</h4>
			<textarea class="form-control" :value="result" readonly></textarea>
		</div>
	</div>
	
	<div class="row p-4 px-2">
		<div class="col-12 border bg-white p-4">
			<h4>入力例</h4>
			<div class="row">
				<div class="col-12">
					<p>たとえば、以下のように入力して</p>
				</div>
				<div class="col-12 border p-3 bg-light">
				あいう,田中,おにぎり
<br />
				いろは,山田,とんかつ
				</div>
				<div class="col-12 mt-3">
					<p>雛形を以下のように入力すると</p>
				</div>
				<div class="col-12 border p-3 bg-light">
					<pre>&lt;h4&gt;$1&lt;/h4&gt;
&lt;table&gt;
	&lt;tr&gt;
		&lt;th&gt;$2&lt;/th&gt;
		&lt;td&gt;$3&lt;/td&gt;
	&lt;/tr&gt;
&lt;/table&gt;</pre>
				</div>
				<div class="col-12 mt-3">
					<p>以下のようになります。</p>
				</div>
				<div class="col-12 border p-3 bg-light">
					<pre>&lt;h4&gt;あいう&lt;/h4&gt;
&lt;table&gt;
	&lt;tr&gt;
		&lt;th&gt;田中&lt;/th&gt;
		&lt;td&gt;おにぎり&lt;/td&gt;
	&lt;/tr&gt;
&lt;/table&gt;
&lt;h4&gt;いろは&lt;/h4&gt;
&lt;table&gt;
	&lt;tr&gt;
		&lt;th&gt;山田&lt;/th&gt;
		&lt;td&gt;とんかつ&lt;/td&gt;
	&lt;/tr&gt;
&lt;/table&gt;</pre>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'replace',
	methods: {
		replace(){
			var vm = this;
			var arr = vm.csv.split(/\r\n|\r|\n/);
			var result = '';
			arr.forEach(function(val){
				if(!val){
					return;
				}
				var arr = val.split(',');
				var result2 = vm.template;
				arr.forEach(function(val2,i){
					if(!val2){
						return;
					}
					var regexp = new RegExp('\\$' + (i+1));
					result2 = result2.replace(regexp,val2);
				});
				result += result2 + "\n";
			});
			vm.result = result;

			
		}
	},
	data(){
		return {
			csv: '',
			template: '',
			result: ''
		}
	}
}
</script>

<style scoped>

</style>
