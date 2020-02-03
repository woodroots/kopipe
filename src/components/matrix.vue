<template>
<div>
	<div class="row p-5 title">
		<div class="col">
			<h1>マトリクス図作成</h1>
			<p>
			Twitterでたまに見るマトリクス図を作成します。
			</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<div id="result">
				<template v-for="(elem,i) in input">
					<drag-it-dude @dropped="dragend(i)">
						<div v-bind:contenteditable="elem[2]" v-on:blur="disedit(i)">
						{{ elem[0] }}
						</div>
						<button v-on:click="edit(i)" class="btn btn-secondary d-inline">編集</button>
					</drag-it-dude>
				</template>
				
				<div class="title title_top" v-bind:contenteditable="editable">見出しを入力</div>
				<div class="title title_bottom" v-bind:contenteditable="editable">見出しを入力</div>
				<div class="title title_left" v-bind:contenteditable="editable">見出しを入力</div>
				<div class="title title_right" v-bind:contenteditable="editable">見出しを入力</div>
				
			</div>
		</div>
	</div>
	
	
	<div class="row px-4 pb-4 justify-content-center">
		<div class="col-6">
			<button class="btn btn-primary btn-block" v-on:click="add">
				追加
			</button>
		</div>
		<div class="col-6">
			<button class="btn btn-info btn-block" v-on:click="generate">
				画像生成
			</button>
		</div>
	</div>
	
	<div class="row">
		<div class="col text-center p-4">
			<h4 class="text-left" v-show="img">結果（保存してご利用ください）</h4>
			<img :src="img" alt="" v-show="img" />
		</div>
	</div>
	
	
	
</div>
</template>

<script>
import Vue from 'vue'
import DragItDude from 'vue-drag-it-dude'

Vue.component('vue-drag-it-dude', DragItDude)


export default {
	name: 'matrix',
	components: {
	DragItDude
	},
	mounted(){
		setTimeout(function(){
		for(name in window.CKEDITOR.instances)
			{
			    window.CKEDITOR.instances[name].destroy()
			}
		},1000);
	},
	methods: {
		add(){
			this.input.push([
				'編集ボタンを押して入力',
				{
					top: '50%',
					left: '50%'
				},
				'false'
			]);
		},
		edit(i){
			this.$set(this.input[i],2,'true');
		},
		disedit(i){
			this.$set(this.input[i],2,'false');
		},
		dragend(i){
			var cr = document.getElementsByClassName('drag-it-dude')[i];
			this.input[i][1] = {
				top: cr.style.top,
				left: cr.style.left
			}
			
		},
		generate(){
			var vm = this;
			vm.$nextTick(function () {
					html2canvas(document.getElementById('result')).then(function(canvas){
						var imgData = canvas.toDataURL('image/jpeg');
						vm.img = imgData;
				});
			})

			//vm.flg = false;
			return false;


		}
	},
	data(){
		return {
			temp: '',
			img: '',
			editable: 'true',
			input: []
		}
	}
}
</script>

<style scoped>
#result {
	position: relative;
	width: 600px;
	height: 600px;
	margin-right: auto;
	margin-left: auto;
	background: 
		linear-gradient(to right,
		rgba(255,255,255,0) 0%,
		rgba(255,255,255,0) 49.9%,
		#000 50%,
		#000 50.1%,
		rgba(255,255,255,0) 50.2%,
		rgba(255,255,255,0) 100%
	),
	linear-gradient(to bottom,
		#fff 0%,
		#fff 49.9%,
		#000 50%,
		#000 50.1%,
		#fff 50.2%,
		#fff 100%
	);
	position: relative;
	overflow: hidden;
	
}
.drag-it-dude {
	position: absolute;
	left: calc(50% - 5rem);
	top: 50%;
	user-select: none;
}
.drag-it-dude > div {
	background: #fff;
}
.drag-it-dude button {
	display: none !important;
}
.drag-it-dude:hover button {
	display: block !important;
}

#result .title {
	background: #fff;
	position: absolute;
}
#result .title p {
	margin-bottom: 0;
}
#result .title_top {
	left: 0;
	top: 10px;
	text-align: center;
	width: 100%;
}

#result .title_bottom {
	left: 0;
	bottom: 10px;
	text-align: center;
	width: 100%;
}

#result .title_left {
	left: 10px;
	top: 10px;
	text-align: center;
	height: 100%;
	width: 1rem;
	display: flex;
	align-items: center;
}
#result .title_right {
	right: 10px;
	top: 10px;
	text-align: center;
	height: 100%;
	width: 1rem;
	display: flex;
	align-items: center;
}
</style>
