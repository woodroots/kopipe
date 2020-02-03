<template>
<div>
	<div class="row p-5 title">
		<div class="col">
			<h1>Exifを消す</h1>
			<p>Exifを消します</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12">
			<h4>ファイルを選択</h4>
			<input type="file" v-on:change="change" />
		</div>
	</div>
	
	<div class="row p-4">
		<div class="col-12">
			<h4>現在のExif</h4>
			<div v-show="exif">
				<pre>{{ exif }}</pre>
			</div>
		</div>
	</div>
	
	
	<div class="row p-4">
		<div class="col-12">
			<h4>結果（保存してご利用ください）</h4>
			<div v-show="img" class="result">
				<img :src="img" />
			</div>
		</div>
		
	</div>
</div>
</template>

<script>
export default {
	name: 'delexif',
	methods: {
		change(e){
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) {
				return;
			}
			this.showExif(files[0]);
			this.delexif(files[0]);
		},
		showExif(file){
			var vm = this;
			EXIF.getData(file,function(){
				var all = EXIF.getAllTags(this);
				var all = JSON.stringify(all, null, "");
				var all = all.replace(/\t/g,'');
				var all = all.replace(/,\"/g,",\n\"");
				if(all == '{}'){
					vm.exif = 'ありません';
				} else if(all){
					vm.exif = all;
				} else {
					vm.exif = 'ありません';
				}
			});
		},
		delexif(file){
			var vm = this;
			var reader = new FileReader();
			reader.onload = function(e){
				var dv = new DataView(e.target.result);
				var offset = 0, recess = 0;
				var pieces = [];
				var i = 0;
				if (dv.getUint16(offset) == 0xffd8){

					offset += 2;
					var app1 = dv.getUint16(offset);
					offset += 2;
					while (offset < dv.byteLength){
					    if (app1 == 0xffe1){
					        
					        pieces[i] = {recess:recess,offset:offset-2};
					        recess = offset + dv.getUint16(offset);
					        i++;
					    }
					    else if (app1 == 0xffda){
					        break;
					    }
					    offset += dv.getUint16(offset);
					    var app1 = dv.getUint16(offset);
					    offset += 2;
					}
					if (pieces.length > 0){
					    var newPieces = [];
					    pieces.forEach(function(v){
					        newPieces.push(this.result.slice(v.recess, v.offset));
					    }, this);
					    newPieces.push(this.result.slice(recess));
					    var newimg = new Blob(newPieces, {type: 'image/jpeg'});
					}
			}
			if(newimg){
				vm.img = URL.createObjectURL(newimg);
			} else {
				vm.img = URL.createObjectURL(file);
			}
		}
		reader.readAsArrayBuffer(file);


		}
	},
	data(){
		return {
			img: '',
			exif: ''
		}
	}
}
</script>

<style scoped>
	.result img {
		width: 100%;
		height: auto;
	}
</style>
