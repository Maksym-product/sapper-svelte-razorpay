<svelte:head>
	<title>Cart</title>
</svelte:head>

<script>
	import {productCart} from './../stores/productCart.js'
	
	function remove(id) {
		$productCart.splice(id, 1)
		productCart.set($productCart)
	}

	function removeOne() {
		productCart.set(null)
	}
</script>
<div class="container p-0">
	{#if $productCart}
	{#if typeof $productCart[0] === "string"}
	<div style="background-color:white;padding-left:5%;padding-right:5%">
		<h6 class="mt-2 mb-0 pt-3">Order Summary</h6><hr class="mt-2 mb-1">
		<div class="row">		
			<div class="col-9">
				<p style="color:dimgray">{$productCart[0]}</p>
				<p><b>Model: </b><span style="color:dimgray">{$productCart[1]}</span></p>
			</div>
			<div class="col-3">
				<p class="mt-5 mb-0">₹{$productCart[2]} X {$productCart[3]}</p>
				<button class="btn btn-default m-0 p-0" style="color:blue;text-decoration:underline;" on:click={() => {removeOne();}}>Remove</button>
			</div>		
		</div>
	</div>
	{:else}
	{#each $productCart as cart, i}
	<div style="background-color:white;padding-left:5%;padding-right:5%">
		<h6 class="mt-2 mb-0 pt-3">Order Summary</h6><hr class="mt-2 mb-1">
		<div class="row">		
			<div class="col-9">
				<p style="color:dimgray">{cart[0]}</p>
				<p><b>Model: </b><span style="color:dimgray">{cart[1]}</span></p>
			</div>
			<div class="col-3">
				<p class="mt-5 mb-0">₹{cart[2]} X {cart[3]}</p>
				<button class="btn btn-default m-0 p-0" style="color:blue;text-decoration:underline;" on:click={() => {remove(i);}}>Remove</button>
			</div>		
		</div>
	</div>
	{/each}
	{/if}
	{#if $productCart.length === 0}
	<h5 class="m-0 pt-2 pb-2" style="background-color:white;color:red">There is no product.</h5>
	{/if}
	{:else}
	<h5 class="m-0 pt-2 pb-2" style="background-color:white;color:red">There is no product.</h5>
	{/if}
</div>
