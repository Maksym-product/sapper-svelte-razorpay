<script>
    import {currentUser} from './../stores/user.js'
    import {onMount} from 'svelte'
    import { tick } from 'svelte'    

    onMount(async() => {
        if (!$currentUser) {
            createLoginButton();
        }
    })
    function createLoginButton(){
        // FirebaseUI config.
        var uiConfig = {
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    return false;
                }
            }
        };        
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    function signOut() {
        firebase.auth().signOut().then(async function() {
            console.log('logged out')
            await tick()
            createLoginButton()
        }).catch(function(error) {
            alert(error)
        });
    }
</script>
<!-- <div id="firebaseui-auth-container"></div> -->
{#if $currentUser}
<div class="mx-auto" style="max-width: 400px; position:relative;">
    <button class="btn btn-danger mx-auto mt-3" style="width: 100px; position:absolute; right:0"
        on:click={() => {
            signOut();
        }}
    >
        Logout
    </button>
</div>
{:else}
<div id="firebaseui-auth-container"></div>
{/if}