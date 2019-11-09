window.addEventListener('load', function () {




new Vue({
  el:'#regforms',
  data: {
    reg_user:'',
    reg_pass:'',
    info:[],
  },
  methods:{
    sub_reg: function() {
        this.info.push({username: this.reg_user, password: this.reg_pass})
        localStorage.setItem(this.reg_user, JSON.stringify(this.info));
        console.log("yes");

        this.reg_user='';
        this.reg_pass='';
    }
  }
});


new Vue({
  el: '#loginforms',
  data: {
    login_user:'',
    login_pass:'',  
  },
  methods: {
    sub_log: function() {
        var accountDetails = JSON.parse(localStorage[this.login_user]);
        if ((this.login_user == accountDetails[0].username) && (this.login_pass = accountDetails[0].password)){
          alert("logged in");
          console.log("yes");
          localStorage.currentAccount = this.login_user;
          this.login_user='';
          this.login_pass='';
        }
      }
    }
  }
);
});

/*      
window.addEventListener('load', function () {




new Vue({
  el:'#regforms',
  data: {
    reg_user:'',
    reg_pass:'',
    info:[],
  },
  methods:{
    sub_reg: function() {
      if (this.reg_user = false || this.reg_user.length < 5){
        alert("username is blank or less than 5 characters");
        this.reg_user='';
        this.reg_pass='';
      }
      else if (this.reg_pass == false || this.reg_pass < 5){
        alert("password is blank or less than 5 characters");
        this.reg_user='';
        this.reg_pass='';
      }
      else {
        this.info.push({username: this.reg_user, password: this.reg_pass})
        localStorage.setItem(this.reg_user, JSON.stringify(this.info));
        console.log("yes");

        this.reg_user='';
        this.reg_pass='';
      }
    }
  }
});


new Vue({
  el: '#loginforms',
  data: {
    login_user:'',
    login_pass:'',  
  },
  methods: {
    sub_log: function() {
       if (this.login_user = false || this.login_user.length < 5){
        alert("username is blank or less than 5 characters");
        this.login_user='';
        this.login_pass='';
      }
      else if (this.login_pass == false || this.login_pass < 5){
        alert("password is blank or less than 5 characters");
        this.login_user='';
        this.login_pass='';
      }
      else if (localStorage[this.login_user] == undefined){
        alert("account does not exist")
      }
      else {
        if ((this.login_user == JSON.parse(localStorage[this.login_user]) && (this.login_pass = JSON.parse(localStorage[this.login_pass])))){
          alert("logged in");
          console.log("yes");
          localStorage.currentAccount = this.login_user;
          }
        }
      }
    }
  }
);
});
          */