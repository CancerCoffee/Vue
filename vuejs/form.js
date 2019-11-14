window.addEventListener('load', function() {




    new Vue({
        el: '#regforms',
        data: {
            reg_user: '',
            reg_pass: '',
            reg_passC: '',
            reg_email: '',
            reg_emailC: '',
            info: [],
        },
        methods: {
            sub_reg: function() {

                if (this.reg_user < 5) {
                    alert('Please check your username field, if blank or less than 5 characters');
                }
                else if (this.reg_pass < 5 || this.reg_pass !== this.reg_passC) {
                    alert('Please ensure that your password is more than 5 characters and match');
                    this.reg_pass = '';
                    this.reg_passC = '';
                } else if (this.reg_email.length <= 0 || this.reg_email !== this.reg_emailC) {
                    alert('Please ensure that you have typed in your email and matches the confirmation');
                } else {
                    var accountDetails = JSON.parse(localStorage['loginkeys']);
                    var objlength = Object.keys(JSON.parse(localStorage.getItem('loginkeys'))).length;
                    var invalid1 = false;
                    var invalid2 = false;
                    for (var i = 0; i < objlength; i++) {
                        if (this.reg_email == accountDetails[i].email) {
                            invalid1 = true;
                        }
                        if (this.reg_user == accountDetails[i].username) {
                            invalid2 = true;
                        }
                    }
                    if (invalid1 && invalid2) {
                        alert("both the username & email is in use")
                    }
                    else if (invalid1){
                      alert("email in use")
                    }
                    else if (invalid2){
                      alert("username in use")
                    }
                    else{
                    this.info.push({username: this.reg_user, password: this.reg_pass, email: this.reg_email})
                    localStorage.setItem('loginkeys', JSON.stringify(this.info));
                    console.log("yes");

                    this.reg_user='';
                    this.reg_pass='';
                    this.reg_passC='';
                    this.reg_email='';
                    this.reg_emailC=''
                  }
                }
            }
        }
    });


    new Vue({
        el: '#loginforms',
        data: {
            login_user: '',
            login_pass: '',
        },
        methods: {
            sub_log: function() {
                var accountDetails = JSON.parse(localStorage['loginkeys']);
                var objlength = Object.keys(JSON.parse(localStorage.getItem('loginkeys'))).length;
                var valid = false;
                for (var i = 0; i < objlength; i++) {
                    if ((this.login_user == accountDetails[i].username) && (this.login_pass == accountDetails[i].password)) {
                        valid = true;
                    }
                }

                if (valid) {
                    alert("logged in");
                    console.log("yes");
                    localStorage.currentAccount = this.login_user;
                    this.login_user = '';
                    this.login_pass = '';
                } else {
                    alert("check your credentials")
                }

            }
        }
    })
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




JSON.parse(localStorage["aaaaa"])[0].username;



else if (this.reg_email.length >= 2){
        var sctable = [];
        var valid = false;

        if (localStorage.length > 0){
          for (var i = 0; i < localStorage.length; i++){
            var location = JSON.parse(localStorage.getItem(localStorage.key(i)));
            sctable.push(location);
            valid = true
          }
        }

        if (valid) {
          for(var i = 0; i < sctable.length; i++){
            if (this.reg_email == sctable[i].email){
              alert('email in use');
            }
          }
        }


      }
          */