window.addEventListener('load', function() {




    new Vue({
        el: '#regforms',
        data: {
            reg_user: '',
            reg_pass: '',
            reg_passC: '',
            reg_email: '',
            reg_emailC: '',
            selected: '',
            info: [],
        },
        methods: {
            sub_reg: function() {

                /*if (this.reg_user < 5) {
                    alert('Please check your username field, if blank or less than 5 characters');
                }*/
                if (/*this.reg_pass < 5 ||*/ this.reg_pass !== this.reg_passC) {
                    alert('Please ensure that your password is more than 5 characters and match');
                    this.reg_pass = '';
                    this.reg_passC = '';
                } /*else if (this.reg_email.length <= 0 || this.reg_email !== this.reg_emailC) {
                    alert('Please ensure that you have typed in your email and matches the confirmation');
                }*/
                else if (localStorage.getItem('loginkeys') === null)
                {
                  this.info.push({username: this.reg_user, 
                                  password: this.reg_pass, 
                                  email: this.reg_email, 
                                  type: this.selected})
                    localStorage.setItem('loginkeys', JSON.stringify(this.info));
                    console.log("yes");

                    this.reg_user='';
                    this.reg_pass='';
                    this.reg_passC='';
                    this.reg_email='';
                    this.reg_emailC='';
                    this.selected='';
                }
                 else {
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
                    this.info.push({username: this.reg_user, 
                                    password: this.reg_pass, 
                                    email: this.reg_email, 
                                    type: this.selected})
                    localStorage.setItem('loginkeys', JSON.stringify(this.info));
                    console.log("yes");

                    this.reg_user='';
                    this.reg_pass='';
                    this.reg_passC='';
                    this.reg_email='';
                    this.reg_emailC='';
                    this.selected='';
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
                var admin = false;
                for (var i = 0; i < objlength; i++) {
                    if ((this.login_user == accountDetails[i].username) && (this.login_pass == accountDetails[i].password)) {
                        valid = true;
                    }
                    if ((this.login_user == accountDetails[i].username) && ( 'admin' == accountDetails[i].type)){
                      admin = true;
                    }
                }

                if ((valid == true) && (admin == true)){
                  alert('logged in as admin');
                  console.log('admin');
                  localStorage.setItem('currentAccount', JSON.stringify({username: this.login_user, admin: true}));
                }
                else if (valid) {

                    alert("logged in");
                    console.log("yes");
                    localStorage.setItem('currentAccount', JSON.stringify({username: this.login_user, admin: false}));
                    this.login_user = '';
                    this.login_pass = '';
                } else {
                    alert("check your credentials")
                }

            }
        }
    })
});