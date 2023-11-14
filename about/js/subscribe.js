document.addEventListener('DOMContentLoaded', function() {
            const subscribeForm = document.getElementById('subscribeForm');
            subscribeForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const email = document.getElementById('emailInput').value;
                if(email) {
                    const database = firebase.database();
                    const subscribersRef = database.ref('subscription/users');
                    const newSubscriber = subscribersRef.push();
                    const postId = newSubscriber.key;
                    newSubscriber.set({
                        email: email,
                        subscriptionDate: new Date().toUTCString(),
                        postId: postId
                    });
                    return false;
                }
            });
        });