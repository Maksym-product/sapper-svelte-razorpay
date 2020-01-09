<script>
    import {onMount} from 'svelte'
    import {currentUser} from './../stores/user.js'

    let flag = false;
    let length = 0;

    onMount(async () => {
        const db = firebase.firestore();
        const date = new Date();
        
        await firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var phoneNumber = user.phoneNumber;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // console.log('user', user)
                currentUser.set(user)
                db.collection("users").onSnapshot(snapData => {
                    try{
                        if (snapData.docs[0]._document.proto.fields.name.stringValue === user.uid){
                            console.log("exists!", snapData.docs[0]._document.proto.fields.name.stringValue);                        
                        } else if (snapData.docs[0]._document.proto.fields.name.stringValue === null){
                            console.log('null')
                            flag = true
                        }
                    } catch (err){
                        if (length === 0) {
                            db.collection("users").add({
                                name: user.uid,
                                fields: {
                                    phoneNumber: user.phoneNumber,
                                    name: user.displayName,
                                    email: user.email
                                },
                                createTime: date.getTime(),
                                updateTime: date.getTime()
                            });
                            flag = false;
                        }
                        length = length + 1;
                    }
                    if (flag === true) {
                        db.collection("users").add({
                            name: user.uid,
                            fields: {
                                phoneNumber: user.phoneNumber,
                                name: user.displayName,
                                email: user.email
                            },
                            createTime: date.getTime(),
                            updateTime: date.getTime()
                        });
                        flag = false;
                    }                                     
                });
            } else {
                currentUser.set(null)
            }
        });         
    });
</script>