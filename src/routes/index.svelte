<svelte:head>
	<title>Product Lists</title>
</svelte:head>

<style>
	.productImage{
		background-size: 96% 96%;
		background-repeat: no-repeat;
		background-position: center;
		height: 140px;
	}
</style>

<script>
	import Login from './../components/Login.svelte'
	import {title} from './../stores/title.js'
	import {currentUser} from './../stores/user.js'
	import {onMount} from 'svelte'

	let db = firebase.firestore();
	let products = [];
	let flag = false;
	
	onMount(async () => {
		await db.collection("products").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const singleProduct = {...doc.data()}				
				products.push(singleProduct)
			});
			if(products.length >= 1) {
				flag = true
			}
		});	
	});

	function setTitle() {
		const nav_title = 'Product Detail'
		title.set(nav_title)
	}
</script>

<div class="container mx-auto pl-0 pr-0" style="max-width: 400px;">
	<h2 style="text-align:center;">PRODUCT LISTS</h2>
	{#if flag === true}
	{#each products as product}
	<div class="card container mt-2" style="width:100%">
		<div class="row">
			<div class="productImage col-4" style={'background-image: url(' + product.fields.primaryImg + ')'}></div>
			<div class="col-8 p-0 m-0" style="position: relative;">
				<div class="card-body">
					<p class="card-title" style="text-align:center;">{product.fields.pdtName}</p>
					<a rel="prefetch" href={'product-detail?id=' + product.name.split('/')[product.name.split('/').length-1]} class="btn btn-primary" style="position:absolute;right:10%;bottom:5%;" on:click={() => {setTitle();}}>See Profile</a>
				</div>
			</div>
		</div>    
	</div>
	{/each}
	{:else}
	<div class="card container mt-2" style="width:100%">
		<p class="card-title pt-2" style="text-align:center;color:red;">There is no product!</p>
	</div>
	{/if}
</div>

<Login />