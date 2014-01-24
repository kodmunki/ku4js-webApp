$.ku4webApp.view("otherView", {
    accountFormRequested: function(data) {
        console.log(data);
    },
    accountCreated: function(data) {
        console.log(data);
    },
    accountInvalid: function(data) {
        console.log(data);
    },
    accountsListed: function(data) {
        console.log(data);
    }
},
{
    "accountFormRequested": "accountFormRequested",
    "accountCreated": "accountCreated",
    "accountInvalid": "accountInvalid",
    "accountsListed": "accountsListed"
});