<template>
<div>
	<div class="row p-5 title">
		<div class="col">
			<h1>都道府県・市区一覧を生成</h1>
			<p>都道府県や市区の一覧を生成します。</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<h3>都道府県を選択してください</h3>
		</div>
		<div class="col-6">
			<h4>都道府県</h4>
			<select v-model="selectPref" v-on:change="prefChange">
				<option v-for="prefItem in prefList" v-bind:value="prefItem.value">
					{{ prefItem.text }}
				</option>
			</select>
		</div>
		<div class="col-6">
			<h4>市町村</h4>
			<select v-model="selectCity">
				<option v-for="cityItem in cityList" v-bind:value="cityItem.value">
					{{ cityItem.text }}
				</option>
			</select>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<h3>一覧</h3>
		</div>
		<div class="col-6">
			<h4>都道府県</h4>
			<textarea class="form-control" :value="prefResult" readonly></textarea>
		</div>
		<div class="col-6">
			<h4>市区</h4>
			<textarea class="form-control" :value="cityResult" readonly></textarea>
		</div>
	</div>
	
	
	
	
</div>
</template>

<script>
var url = 'https://geoapi.heartrails.com/api/json';
export default {
	name: 'pref',
	methods: {
		prefChange(){
			var vm = this;
			vm.$jsonp(url,{
				method: 'getCities',
				prefecture: this.selectPref,
				callbackQuery: 'jsonp'
			}).then(function(json){
				var result = '';
				json.response.location.forEach(function(val,i){
					result += val.city + "\n";
					vm.cityList.push({
						text: val.city,
						value: i.city
					});
				});
				var result = result.replace(/\n+$/g,'');
				vm.cityResult += result;
			});
		}
	},
	async mounted(){
		var vm = this;
		vm.$jsonp(url,{
			method: 'getPrefectures',
			callbackQuery: 'jsonp'
		}).then(function(json){
			var result = '';
			json.response.prefecture.forEach(function(val,i){
				result += val + "\n";
				vm.prefList.push({
					text: val,
					value: val
				});
			});
			var result = result.replace(/\n+$/g,'');
			vm.prefResult = result;
		});
	},
	data(){
		return {
			prefResult: '',
			cityResult: '',
			selectPref: '選択してください',
			prefList: [
				{
					text: '選択してください',
					value: '選択してください'
				}
			],
			selectCity: '選択してください',
			cityList: [
				{
					text: '選択してください',
					value: '選択してください'
				}
			]
		}
	}
}
</script>

<style scoped>

</style>
