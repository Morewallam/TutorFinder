/**
 * checks the login satus then sets
 * the text in the nav bar to the correct text
 */
// check for login
function authentication(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Logged in as" + user);
            document.getElementById('notifylogin').innerHTML = "you are LOGGED IN"; 
            document.getElementById('login').innerHTML ="";
            document.getElementById('logOut').innerHTML =  "<a class='nav-link logout' href='javascript:void(0)'>Logout</a>";
        } else {
            console.log("not logged in");
            document.getElementById('notifylogin').innerHTML = "LOGIN to book appoitments";
            document.getElementById('login').innerHTML="<a class='nav-link' href='./login.html' >Login</a>";
            document.getElementById('logOut').innerHTML = ""
                
      
      }
    });

    $(".logout").click(function (event) {
        event.preventDefault();
        firebase.auth().signOut().then(function () {
          console.log('logged out');
        }).catch(function (error) {
            console.log('error');
                // An error happened.
        });
    });

















    
}

//deploy test
//deploy test
//deploy test
//deploy test

//deploy test
//deploy test
//deploy test
//deploy test
//deploy test
//deploy test
//deploy test
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss

//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss

//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss

//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss
//testssssssssssssssssssssssssssssssssssssssssssssssssssssss

