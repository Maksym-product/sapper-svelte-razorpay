<script>
	import Nav from '../components/Nav.svelte';
	import UserObserver from '../components/UserObserver.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		background-color: #f3f3f3;
		padding: 0.5em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<UserObserver />
<Nav {segment}/>

<main>
	<slot></slot>
</main>


