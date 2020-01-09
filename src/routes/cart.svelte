<svelte:head>
	<title>Cart</title>
</svelte:head>

<script>
	import {productCart} from './../stores/productCart.js'
	import {title} from './../stores/title.js'
	import {currentUser} from './../stores/user.js'	
	import {order} from './../stores/order.js'

	let stateSentence = "There is no product!"
	let paymentId = null;
	let orderID = '';
	let state = null;	
 		
	function remove(id) {
		$productCart.splice(id, 1)
		productCart.set($productCart)
	}

	function removeOne() {
		productCart.set(null)
	}
<<<<<<< HEAD

	function RequestOrderPayment () {
		let key_id = "rzp_test_6hU64GtcNIjENJ";
		let key_secret = "bvkwZhEGVMOpdnbrsWRZxMpx";
		let amount = 0;
		let name = $currentUser.displayName;
		let email = $currentUser.email;
		let number = $currentUser.phoneNumber;		
		if (typeof $productCart[0] === "string") {
			amount = $productCart[2]*$productCart[3]*100
		} else {
			for (let i = 0; i< $productCart.length; i++) {
				const singleAmount = $productCart[i][2]*$productCart[i][3]*100
				amount = amount + singleAmount;
			}
		}		
        fetch('createOrder', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				amount: amount,
				receipt: "gurkaran_order_54654"
			})
		})
		.then(response => {
			response.json()
			.then(function(result) {
				orderID = result.id
				var options = {
					"key_id": key_id,
					"key_secret": key_secret,
					"amount": amount,
					"currency": "INR",
					"name": "Acme Corp",
					"description": "A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami",
					"order_id": orderID,
					handler: function (response) {
						const razorpay_payment_id = response.razorpay_payment_id
						const razorpay_order_id = response.razorpay_order_id
						const razorpay_signature = response.razorpay_signature
						order.set(response)
						stateSentence = 'Transaction Successfull!!'
						fetch('signature', { 
							method: 'POST',
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify({
								payment_id: razorpay_payment_id,
								order_id: razorpay_order_id,
								signature: razorpay_signature
							})
						})
						.then(response => {
							response.json()
							.then(function(result) {
								productCart.set(null)
								if (result === true) {									
									state = "Success"
								} else {
									state = "Failed"
								}
							});
						})
						.catch(err => {
							console.log('POST error', err.message)
						})					
					},
					"prefill": {
						"name": name,
						"email": email,
						"contact": number,
					},
					"notes": {
						"address": "note value",
					},
					"theme": {
						"color": "#F37254"
					}
				};
				var rzp1 = new window.Razorpay(options)
				rzp1.open();
			})			
		})
		.catch(err => {
			console.log('POST error', err.message)
		})
    }
=======
>>>>>>> 3241efc31e38e1f647841481754e33834676f468
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
<<<<<<< HEAD
				<p class="mt-4 mb-0">₹{$productCart[2]} X {$productCart[3]}</p>
				<button class="btn btn-default mt-1 p-0" style="color:blue;text-decoration:underline;" on:click={() => {removeOne();}}>Remove</button>
			</div>		
		</div>
	</div>
	{#if paymentId}
	<p>{paymentId}</p>
	{/if}
	<button class="razorpay-payment-button" on:click={() => {RequestOrderPayment();}}>Pay</button>
=======
				<p class="mt-5 mb-0">₹{$productCart[2]} X {$productCart[3]}</p>
				<button class="btn btn-default m-0 p-0" style="color:blue;text-decoration:underline;" on:click={() => {removeOne();}}>Remove</button>
			</div>		
		</div>
	</div>
>>>>>>> 3241efc31e38e1f647841481754e33834676f468
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
<<<<<<< HEAD
	<button class="razorpay-payment-button" on:click={() => {RequestOrderPayment();}}>Pay</button>
=======
>>>>>>> 3241efc31e38e1f647841481754e33834676f468
	{/if}
	{#if $productCart.length === 0}
	<h5 class="m-0 pt-2 pb-2" style="background-color:white;color:red;text-align:center;">{stateSentence}</h5>
	{/if}
	{:else}
	{#if $order}
	<h1 style="text-align:center;color:green">{stateSentence}</h1>
	<div>
		<div class="card mt-4 mx-auto">
			<ul class="list-group">
				<li class="list-group-item">
				<strong>
					Payment ID: {$order.razorpay_payment_id}</strong>
				</li>
				<li class="list-group-item">
				<strong>
					Order ID: {$order.razorpay_order_id}</strong>
				</li>
				<li class="list-group-item">
				<strong>
					Signature: {$order.razorpay_signature}</strong>
				</li>
				<li class="list-group-item">
				<strong>
					Status: {state}</strong>
				</li>
			</ul>
			<a href="/" class="btn btn-primary mt-2" title="Home">Home</a>
		</div>
	</div>
	{:else}
	<h5 class="m-0 pt-2 pb-2" style="background-color:white;color:red;text-align:center;">{stateSentence}</h5>
	{/if}
<<<<<<< HEAD
	{/if}		
</div>
=======
</div>
>>>>>>> 3241efc31e38e1f647841481754e33834676f468
