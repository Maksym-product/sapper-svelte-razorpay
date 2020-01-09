<style>
	.primaryImage {
		max-width: 400px;
		height: 400px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.subImg {
		height: 100px;
		background-position: center;
		background-size: 92% 100%;
		background-repeat: no-repeat;
	}
	.row {
		max-width: 400px;
	}
	.detail {
		max-width: 400px;
	}
	.form-inline {
		max-width: 400px;
	}
	.product {
		max-width: 400px;
		background-color: white;
		margin-top: 10px;
		padding: 10px;		
	}
	.containerIntro h4, .containerIntro h2, .containerIntro del {
		display: inline;
		vertical-align: top;
		font-family: 'Open Sans', sans-serif;
		line-height: 28px;		
	}
	.function {
		max-width: 400px;
	}
</style>

<svelte:head>
	<title>Project Detail</title>
</svelte:head>

<script>
	import {currentUser} from './../stores/user.js'
	import {productCart} from './../stores/productCart.js'
	import {title} from './../stores/title.js'
	import Login from './../components/Login.svelte'
	import {onMount} from 'svelte'
	import { stores } from "@sapper/app"
	let db = firebase.firestore();
	const { page } = stores();
	let count = 0;
	let id = $page.query.id;
	id = 'projects/airsell-india/databases/(default)/documents/products/' + id
	let productDetail = [];
	let pro = [];
	let mainUrl = "";
	let product = [];
	let totalProduct = [];
	let detail_flag = false;
	onMount(async() => {
		await db.collection("products").where('name','==',id).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const singleProduct = {...doc.data()}				
				productDetail.push(singleProduct)
			});
		});
		if (productDetail.length === 1) {
			detail_flag = true
		}
		mainUrl = 'background-image: url(' + productDetail[0].fields.primaryImg + ')'
	});

	function increment() {
		count = count + 1
	};
	
	function decrement() {
		if(count == 0) {
			count = 0;
		} else{
			count = count -1;
		}      
	};

	function cart() {
		if ($productCart === null) {
			product.push(productDetail[0].fields.pdtName);
			product.push(document.getElementById('sel1').value);
			product.push(productDetail[0].fields.salePrice);
			product.push(count);
			productCart.set(product);
			product = [];
		} else {
			let flag = false;
			if (typeof $productCart[0] === "string") {
				totalProduct.push($productCart)
			} else {
				$productCart.forEach((item) => {
					totalProduct.push(item)
				});
			}				
			product.push(productDetail[0].fields.pdtName);
			product.push(document.getElementById('sel1').value);
			product.push(productDetail[0].fields.salePrice);
			product.push(count);			
			totalProduct.forEach((item) => {
				if ((item[0] === product[0]) && (item[1] === product[1])) {
					item[3] = item[3] + product[3]
					flag = true
				}
			})
			if (flag === false) {
				totalProduct.push(product);
			} else {
				flag = false
			}
			
			productCart.set(totalProduct)
			product = [];
			totalProduct = [];
		}
		count = 0;		
	}

	function navTitle () {
		title.set('Cart')
	}
</script>

<div class="container pl-0 pr-0">
	{#if detail_flag}
	<div class="primaryImage mx-auto" style={mainUrl}></div>	
	<div  class="row mx-auto">
		{#each productDetail[0].fields.ImgSrc.values as subUrl}
		<p style="display:none">{subUrl = 'background-image: url(' + subUrl + ')'}</p>
		<div class="subImg col-3 mt-2 pl-0 pr-1"
			style={subUrl}
		>
		</div>
		{/each}
	</div>
	
	<div class="product mx-auto">
		<div class="detail mt-3">
			<h4><b>Details</b></h4>
			<p style="color:dimgray">{productDetail[0].fields.pdtDescription}</p>
		</div>

		<div class="form-inline">
			<label for="sel1"><p style="font-size: 30px; margin-left: 10px; margin-right: 15px;margin-bottom: 0px;">Model:</p></label>
			<select class="form-control" style="width:50%;cursor:pointer;" id="sel1" name="sellist1">
				{#each productDetail[0].fields.model.values as model}
				<option>{model.model}</option>
				{/each}
			</select>		
		</div>
				
		{#if !$currentUser}
		<Login />		
		<p style="color:red;text-align:center;">Please sign into to check price</p>
		{:else}
		<div class="containerIntro mt-2">
			<h4><b>Reseller Price:</b></h4><h2><b>&nbsp;&nbsp;₹{productDetail[0].fields.salePrice}&nbsp;&nbsp;</b></h2><del> ₹{productDetail[0].fields.msrp} </del>
		</div>
		<div class="quantity mt-4">
			<h6 style="color:dimgray;">Quantity</h6>
			<span class="badge badge-secondary" style="border-radius:0px;width:35px;height:35px;background-color:darkgrey;font-size:20px;cursor:pointer;" on:click={() => {decrement();}}>-</span>
			<span class="badge badge-secondary" style="border-radius:0px;width:40px;height:35px;background-color:#f3f3f3;color:dimgray;margin-left:-5px;margin-right:-5px;font-size:20px;">{count}</span>
			<span class="badge badge-secondary" style="border-radius:0px;width:35px;height:35px;background-color:darkgrey;font-size:20px;cursor:pointer;" on:click={() => {increment();}}>+</span>
		</div>
		{/if}
	</div>
	{#if $currentUser}
	<div class="function mx-auto mt-2" style="background-color: #f3f3f3">
		<button on:click={() => {cart();}} data='{id}' type="button" class="btn btn-primary btn-block" style="border:0;border-radius:0px;background-color:indianred"><i class='fas fa-cart-plus'></i> ADD TO CART </button>
		<div style="background-color:black;padding:3px 6px;margin-top:5px;">
			<a type="button" class="btn btn-primary btn-block" href="/cart" on:click={() => {navTitle();}}
				style="padding:0;
					border-color: red;
					border-radius:5px;
					background:red;
					font-size:25px;
					font-weight:bold;
					pointer:cursor"
			>
				B U Y &nbsp; N O W
			</a>
		</div>				
	</div>
	<Login />
	{/if}
	{/if}	
</div>