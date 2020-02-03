<template>
  <div id="app" class="container-fluid">
	<div class="row">
		<div class="col">
			<div class="navbtn">
				<a href="#"><span></span><span></span><span></span></a>
			</div>
			<div class="side">
				<commonNav />
			</div>
			<div class="main">
				<router-view />
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import commonNav from './components/nav.vue'
import PerfectScrollbar from 'perfect-scrollbar';

export default {
  name: 'App',
  components: {
  	commonNav
  },
  mounted(){
  		
		const container = document.querySelector('.side');
		const ps = new PerfectScrollbar(container);
		document.querySelector('.navbtn').addEventListener('click',function(){
			document.querySelector('.side').classList.toggle("open");
			document.querySelector('.navbtn').classList.toggle("open");
		},false);


  }
}
</script>

<style scoped>
.side {
	box-sizing: border-box;
	z-index: 100;
	width: 0;
	position: fixed;
	height: 100%;
	left: 0;
	top: 0;
	background: #2E324E;
	box-shadow: 0 0 10px rgba(0,0,0,0.1);
	overflow: auto
}
@media (min-width: 576px) {
	.side {
		width: 250px;
	}
}
.side.open {
	width: 250px;
}



.main {
	margin-left: 0;
}
@media (min-width: 576px) {
	.main {
		margin-left: 250px;
	}
}

.navbtn a {
	width: 50px;
	height: 50px;
	box-sizing: border-box;
	padding: 14px;
	background: #2E324E;
	position: absolute;
	left: 0;
	top: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
@media (min-width: 576px) {
	.navbtn {
		display: none;
	}
}
.navbtn.open a {
	left: 250px;
}
.navbtn a span {
	height: 2px;
	width: 100%;
	background: #fff;
	display: block;
}
</style>
