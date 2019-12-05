/**
 * checks the login satus then sets
 * the text in the nav bar to the correct text
 */
// check for login
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
  
$("#logout").click(function (event) {
    event.preventDefault();
    firebase.auth().signOut().then(function () {
      console.log('logged out');
    }).catch(function (error) {
        console.log('error');
            // An error happened.
    });
});


/**
 * Gets a list of tutors from the databse and displays the top three.
 */
function indexTutors(){
     // create the list of tutors from the database
     var tutorsName = document.getElementsByClassName("name");
     var tutorsPrice = document.getElementsByClassName("price");
     var tutorsSubject = document.getElementsByClassName("subject");
     i = 0;
     //first tutor 
     db.collection("Tutors")
       .orderBy("rating")
       .limit(3)
       .get()
       .then(function (querySnapshot) {
         querySnapshot.forEach(function (doc) {
           tutorsName[i].innerHTML = doc.data().name;
           tutorsPrice[i].innerHTML = "Price: $" + doc.data().price + "/h";
           tutorsSubject[i].innerHTML = "Subject: " + doc.data().subject;
             i++;
         });
         i == 0;
       });


       $("#first").click(function(event){
         event.preventDefault();
         queryString = document.getElementsByClassName("name");     
         window.location.href = "./tutorProfile.html?tutor=" + queryString[0].innerHTML;
       });
       $("#second").click(function(event){
         event.preventDefault();
         queryString = document.getElementsByClassName("name");
         window.location.href = "./tutorProfile.html?tutor=" + queryString[1].innerHTML;
       });
       $("#third").click(function(event){
         event.preventDefault();
         queryString = document.getElementsByClassName("name");
         window.location.href = "./tutorProfile.html?tutor=" + queryString[2].innerHTML;
       });
}
/**
 * Get the appointments from the database for that user 
 * and sets the appointments on the page.
 * @param {*} user to check the current user
 */
function indexAppointments(user){
        var appointName = document.getElementsByClassName("tutor");
        var appointDate = document.getElementsByClassName("date");
        var appointLoc = document.getElementsByClassName("location");
        var appointTime = document.getElementsByClassName("time");
        let i = 0;
        db.collection("appointments").where("student","==", user.uid)
        .limit(3)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(user.uid);

            console.log(appointName);
            console.log(appointDate);
            console.log(appointLoc);
            console.log(appointTime);
            console.log(doc.data().tutor, doc.data().date,doc.data().location,doc.data().time )

            appointName[i].innerHTML = doc.data().tutor;
            appointDate[i].innerHTML = doc.data().date;
            appointLoc[i].innerHTML = doc.data().location;
            appointTime[i].innerHTML = doc.data().time;
            i++;
            // console.log(doc.data().tutor, doc.data().date,doc.data().location,doc.data().time )
          });
          i == 0;
        })
        .catch(function(error){
          console.log("Error getting documents: ", error);
        });
}



/**
 * Sets up the login ui on the login page.
 */
function loginUI(){
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: 'index.html',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: 'index.html',
            // Privacy policy url.
            privacyPolicyUrl: 'index.html'
        };

        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
}

/**
 * The javascript for the tutors profile page
 * displays the data from the databse and puts it in a div of that tutor.
 */
function profile(){
    var name = window.location.href//name = url 
        var url = new URL(name); //pass url through URL obj
        var query_string = url.search; //parse???
        var search_params = new URLSearchParams(query_string);//pass thorugh URLsearchparams obj
        var tutor = search_params.get('tutor');// get the tutor name
        console.log(tutor);
        document.getElementById("name").innerHTML = tutor;// show tutor name on page


        db.collection("Tutors").where("name", "==", tutor)//when name = tutorname
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // put the correct data in the profile page.
                    document.getElementById("price").innerHTML = "Price: $" + doc.data().price + "/h";
                    document.getElementById("subject").innerHTML = "Subject: " + doc.data().subject;
                    document.getElementById("rating").innerHTML = "Rating: " + doc.data().rating;
                    document.getElementById("contact").innerHTML = "Contact: " + doc.data().contact;
                })
            })

        $("#bookbtn").click(function (event) {
            event.preventDefault();
            window.location.href = "./Booking.html?tutor=" + tutor;

        });
}


/**
 * Is the javascript for the selections page.
 * grabs the tutors from the database and prints them in a div on the page.
 */
function selector(){
    db.collection("Tutors")
    .orderBy("rating")
    .get()
    .then(function (querySnapshot) {
      //querySnapshot.forEach(function (doc) {

        var tutorList = "";
        console.log(querySnapshot.docs);
        for(let i = 1; i <= querySnapshot.size; i++){
          if(i%3 == 1){
            tutorList += "<div class='row'>";
          }
            tutorList +=  "<div class='col-lg-4'>";
            tutorList += "<img src='Images/blank_pp.png' class='pp'>"
            tutorList +=  "<button type='button' class='btn btn-link'><a id='"+i+"' href='./tutorProfile.html'><span class='name'></span></a></button>";
            tutorList += "<div class='bio'>";
            tutorList += "<div><span id='price"+i+"'></span></div>";
            tutorList += "<div><span id='subject"+i+"'></span></div>";
            tutorList += "</div></div>";
          if(i%3 == 0){
            tutorList += "</div>";
          }
        }
        console.log(tutorList);
        $(".container").html(tutorList);
        let c = 1;
        querySnapshot.forEach(function (doc) {
          
              var name = document.getElementById(c);
              var price = document.getElementById("price"+c);
              var subject = document.getElementById("subject"+c);
              name.innerHTML = doc.data().name;
              price.innerHTML = "Price: $" + doc.data().price + "/h";
              subject.innerHTML = "Subject: " + doc.data().subject;

              c++;
        });
        for(let count =1; count <=querySnapshot.size;count++){
          $("#"+count).click(function (event) {
                event.preventDefault();
                queryString = document.getElementById(count);
                window.location.href = "./tutorProfile.html?tutor=" + queryString.innerHTML;
          });
        }
        
    });
}

/**
 * Sumbits the responses in the forum to the database, 
 * and puts in the correct values from the tutor in the values.
 */
function booking(){
    var name = window.location.href//name = url 
    var url = new URL(name); //pass url through URL obj
    var query_string = url.search; //parse???
    var search_params = new URLSearchParams(query_string);//pass thorugh URLsearchparams obj
    var tutorName = search_params.get('tutor');// get the tutor name
    console.log(tutorName);
    document.getElementById("nameDisplay").innerHTML = tutorName;// show tutor name on page

    db.collection("Tutors").where("name", "==", tutorName)//when name = tutorname
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log("Current data: ", c.data());
          document.getElementById("priceDisplay").innerHTML = doc.data().price + "/h";
          document.getElementById("formGroupExampleInput").innerHTML = "<option>"+doc.data().subject+"</option>";
        })
      })
    ////////////^^^^^^^^^^^DISPLAY NAME AND PRICE DEPENDEND ON URL VARIABLE NAME/^^^^^^^^^^^^^^^//////////
    // Send the forum data to the database.
    $("#myform").submit(function (event) {
      event.preventDefault();
      let tutor = tutorName;
      let price = $("#priceDisplay").val();
      let subject = $("#formGroupExampleInput").val();
      let course = $("#formGroupExampleInput2").val();
      let date = $("#datePicker").val();
      let time = $("#TimePicker").val();
      let location = $("#locationInput").val();
    

      function setDatabase(_callback) {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            db.collection("appointments")
              .doc()
              .set({
                date: date,
                location: location,
                price: price,
                student: user.uid,
                time: time,
                tutor: tutor,
                subject: subject,
                course: course,
              });
            document.getElementById("myform").reset();
          } else {
            alert("please Log-in :)");
            window.location.href = "./index.html"
          }
        });
        _callback();
      }
      function locationChaange() {
        setDatabase(function () {
          var div = $("#myform");
          var htmlContent = "Submited Please return to the home page";
          div.html(htmlContent);


         
        });

      }
      locationChaange();



    });
}