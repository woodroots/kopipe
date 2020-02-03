<template>
<div>
	<div class="row p-5 title">
		<div class="col text-center">
			<h1>{{ pagetitle }}</h1>
			<p>{{ pagedesc }}</p>
		</div>
	</div>
	<div class="row p-4">
		<div class="col-12 col-sm-6 mb-3">
			<div class="card text-dark">
				<div class="card-body">
					<h5 class="card-title">あああああああ</h5>
					<p>えええええええええええええええ</p>
				</div>
			</div>
		</div>
		<div class="col-12 col-sm-6 mb-3">
			<div class="card text-dark">
				<div class="card-body">
					<h5 class="card-title">あああああああ</h5>
					<p>えええええええええええええええ</p>
				</div>
			</div>
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
  data(){
  	return {
  		pagetitle: '',
  		pagedesc: ''
  	}
  }
}
</script>

<style scoped>
</style>
