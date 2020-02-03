<template>
<div>
	<div class="row p-5 title">
		<div class="col">
			<h1>プレゼン資料作成</h1>
			<p>Twitterでよく見る「推しを推すプレゼン画像」を作成します。</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<input type="text" class="form-control" v-model="title" placeholder="タイトルを入力" />
		</div>
	</div>
	<div class="row p-4" v-for="result,i in results">
		<div class="col-4">
			<input type="file" class="form-control" v-on:change="showimg(i,$event)" />
			<img :src="result.img" v-show="result.img"  class="resultimg" alt="" />
		</div>
		<div class="col-6">
			 <vue-ckeditor 
      v-model="result.text" 
      :config="config" />
      
		</div>
		<div class="col-2 btn-control">
			<button class="btn btn-secondary" v-on:click="up(i)">上へ</button>
			<button class="btn btn-secondary" v-on:click="down(i)">下へ</button>
			<button class="btn btn-secondary" v-on:click="del(i)">消す</button>
		</div>
	</div>
	
	<div class="row p-4 justify-content-center">
		<div class="col-6">
			<button class="btn btn-primary btn-block" v-on:click="add">追加</button>
		</div>
	</div>
	
	<div class="row p-4 justify-content-center">
		<div class="col-6">
			<button class="btn btn-info btn-block" v-on:click="setimg">プレゼン生成</button>
		</div>
	</div>
	
	<div class="row" id="result_temp" v-show="flg">
		<div class="col-12">
			<div v-for="result_outer,i in results_temp" class="result_outer">
					<div class="row" v-if="i === 0">
						<div class="col-12"><h2 class="text-center">{{ title }}</h2></div>
					</div>
				<div class="row item" v-for="result,i in result_outer">
					<div class="col-4">
						<img :src="result.img" class="resultimg" />
					</div>
					<div class="col-8">
						<p v-html="result.text"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="row p-4">
		<div class="col-12">
			<h4>結果（保存してご利用ください）</h4>
			<div v-show="img" class="result" v-for="imgSingle,i in img">
				<img :src="imgSingle"  class="resultimg" />
			</div>
		</div>
		
	</div>
</div>
</template>

<script>

export default {
	name: 'presen',
	methods: {
		add(){
			this.results.push({
				img: '',
				text: ''
			});
		},
		up(i){
			var results = this.results;
			if(i !== 0){
				results.splice(i-1, 2, results[i], results[i-1]);
			}
			this.results = results;
		},
		down(i){
			var results = this.results;
			if(i !== results.length - 1){
				results.splice(i, 2, results[i+1], results[i]);
			}
			this.results = results;
		},
		del(i){
			var results = this.results;
			results.splice(i, 1);
			this.results = results;
		},
		showimg(i,e){
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) {
				return;
			}
			this.resultimg(i,files[0]);
		},
		resultimg(i,file){
			var vm = this;
			var image = new Image();
			var reader = new FileReader();
			reader.onload = function(e){
				vm.results[i].img = e.target.result;
			}
			reader.readAsDataURL(file);
		},
		setarr(raw){
	      let dist = [[]];
	      raw.forEach((el, idx) => {
	        let tail = dist.length - 1;
	        dist[tail].push(el);
	        if (dist[tail].length > 4 - 1)
	          dist.push([]);
	      });
	      return dist;
		},
		setimg(){
			var vm = this;
			vm.flg = true;
			vm.img = [];
			vm.results_temp = vm.setarr(vm.results);

			vm.$nextTick(function () {
				document.querySelectorAll('.result_outer').forEach(function(elem,i){
					html2canvas(elem).then(function(canvas){
						var imgData = canvas.toDataURL('image/jpeg');
						vm.img.push(imgData);
					});
					
				});
			})

			//vm.flg = false;
			return false;
		}
	},
	mounted(){
	},
	data(){
		return {
			title: '',
			img: [],
			flg: true,
	      config: {
	        toolbar: [
	          ['TextColor', 'FontSize', 'Bold', 'Strike']
	        ],
	        removePlugins: ['elementspath'],
	        height: 100
	      },
	      results: [
					{
						img: '',
						text: ''
					}
				],
				results_temp: []
		}
	}
}
</script>

<style scoped>
	.resultimg  {
		width: 100%;
		height: auto;
	}
	.result_outer {
		background: #fff;
		width: 600px;
		padding: 20px;
		margin-bottom: 100px;
		position: absolute;
		left: -1000px;
		top: 0;
	}
	.result_outer .item + .item {
		margin-top: 20px;
	}
	.cke_bottom {
		display: none !important;
	}
	.btn-control button + button {
		margin-top: 10px;
	}
</style>
