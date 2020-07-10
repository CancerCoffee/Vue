window.addEventListener('load', function() {




new Vue({
  el: '#top_menu',
  data: {
    loggedIn: true,
    admin: true,
  },
  methods: {
  	logout: function(){
  		localStorage.removeItem("currentAccount");
  		window.location.href = "index.html";
  	}
  },
  computed: {
    loginCheck: function() {
      if (localStorage.getItem('currentAccount') !== null) {
      	var check = JSON.parse(localStorage['currentAccount']).admin;
      	var currentInfo = JSON.parse(localStorage['currentAccount']).username;
        if (check == false){
        	this.admin = false;
        	return currentInfo;
        }
        else if (check == true){
        	return currentInfo;
        }
      } else {
        this.loggedIn = false;
      }
    }
  }
})


})

/*

        this.loggedInUser.push((JSON.parse(localStorage['currentAccount']).username));

*/