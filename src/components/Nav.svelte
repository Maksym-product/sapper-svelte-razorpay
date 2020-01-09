<script>
	import {productCart} from './../stores/productCart.js';
	import {title} from './../stores/title.js';
	import { stores } from "@sapper/app"
	import {onMount} from 'svelte'
	const { page } = stores();
	export let segment;
	let nav_title = '';
	let product_count = null;
	onMount(() => {
		if( $page.path == '/') {
		nav_title = "Product Lists"			
		} else if ($page.path.includes('product-detail')) {
			nav_title = "Product Detail"
		} else if ($page.path == '/cart') {
			nav_title = "Cart"
		} else if ($page.path == './charge') {
			nav_title = "Charge"
		} else {
			nav_title = "404"
		}
		title.set(nav_title)				
	})
	const setTitle = event => {
		if (event.target.parentElement.href.charAt(event.target.parentElement.href.length-1) == '/'){
			nav_title = "Product Lists"	
		} else {
			nav_title = "Cart"
		}
		title.set(nav_title)
	}	
</script>

<style>
	nav {
		padding-top: 10px;
	}
	.badge-notification {
		position: relative;
		margin-right: 10px;
	}
	.badge-notification[data-badge]::after {
		content: attr(data-badge);
		position: absolute;
		top: -11px;
		right: -10px;
		display: flex;
		justify-content: center;
		align-content: center;
		width: 22px;
		height: 22px;
		line-height: 22px;
		font-size: 12px;
		font-weight: 600;
		border-radius: 50%;
		background: var(--secondary);
		color: #fff;
	}
	span.badge-notification[data-badge]::after {
		top: -11px;
		right: -14px;
	}
	.nav-item {
		margin-top: 2%;
		margin-bottom: 3%;
		margin-left: 4%;
		margin-right: 4%;
	}
	.nav-link {
		padding: 0rem;
	}
</style>

<nav class="container">
	<ul class="nav justify-content-center">
		<li class="nav-item">
			<a class="nav-link mt-2" class:active='{segment === undefined}' href='.' on:click={() => {setTitle(event);}}>
				<i class="fas fa-chevron-left" style="font-size:20px;color:rgba(255, 0, 0, 0.4);cursor: pointer;">&nbsp;Back</i>
			</a>
		</li>
		<li class="nav-item" style="text-align:center;width:141px;">
			<p style="margin-top:2px;font-weight:bold;color:black;font-size:1.3rem;">{$title}</p>
		</li>
		<li class="nav-item">
			<a class="nav-link" class:active='{segment === "cart"}' href='cart' on:click={() => {setTitle(event);}}>
				<i class='fas fa-cart-plus mt-2 mb-0' style='font-size:20px;color:rgba(255, 0, 0, 0.4);cursor: pointer;'>
					{#if $productCart}
					{#if typeof $productCart[0] === "string"}
					<span class="badge-notification mt-5" data-badge="1"></span>
					{:else}
					<span class="badge-notification mt-5" data-badge={$productCart.length}></span>
					{/if}
					{:else}
					<span class="badge-notification mt-5" data-badge="0"></span>
					{/if}
				</i>
			</a>
		</li>			
	</ul>
</nav>
