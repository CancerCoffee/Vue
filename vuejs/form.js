window.addEventListener('load', function() {




    new Vue({
        el: '#regforms',
        data: {
            reg_user: '',
            reg_pass: '',
            reg_passC: '',
            reg_email: '',
            reg_emailC: '',
            selected: 'user',
            info: [],
            alert: '',
        },
        methods: {
            sub_reg: function() {
                if (this.reg_user <= 0) {
                    console.log('Please check your username field, if blank or less than 5 characters');
                } else if (this.reg_pass <= 0 || this.reg_pass !== this.reg_passC) {
                    console.log('Please ensure that your password is more than 5 characters and match');
                } else if (this.reg_email.length <= 0 || this.reg_email !== this.reg_emailC) {
                    console.log('Please ensure that you have typed in your email and matches the confirmation');
                } else if (localStorage.getItem('loginkeys') === null) {
                    this.info.push({
                        username: this.reg_user,
                        password: this.reg_pass,
                        email: this.reg_email,
                        type: this.selected
                    })
                    localStorage.setItem('loginkeys', JSON.stringify(this.info));
                    fetch(`http://localhost:3000/activity/users/`, {
                    method: 'post',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.info)
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log('try again'))
      
                    this.alert = 'account created';
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
                        this.alert = "both the username & email is in use";
                    } else if (invalid1) {
                        this.alert = 'email in use, pick another';
                    } else if (invalid2) {
                        this.alert = 'username in use, pick another';
                    } else {
                        this.info.push({
                            username: this.reg_user,
                            password: this.reg_pass,
                            email: this.reg_email,
                            type: this.selected
                        })
                        localStorage.setItem('loginkeys', JSON.stringify(this.info));
                        fetch(`http://localhost:3000/activity/users/`, {
                    method: 'post',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.info)
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log('try again'))
                    console.log('hi');
      
                    alert("You have been registered");
                    this.alert = 'account created';
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
            alert: '',
        },
        methods: {
            sub_log: function() {
                var accountDetails = JSON.parse(localStorage['loginkeys']);
                var objlength = Object.keys(JSON.parse(localStorage.getItem('loginkeys'))).length;
                var valid = false;
                var admin = false;
                var currentUsername = [];
                for (var i = 0; i < objlength; i++) {
                    if ((this.login_user == accountDetails[i].email) && (this.login_pass == accountDetails[i].password)) {
                        valid = true;
                        var currentUsername = accountDetails[i].username;
                    }
                    if ((this.login_user == accountDetails[i].email) && ('admin' == accountDetails[i].type)) {
                        admin = true;
                    }
                }
                if ((valid == true) && (admin == true)) {
                    localStorage.setItem('currentAccount', JSON.stringify({
                        username: currentUsername,
                        admin: true
                    }));
                    window.location.href = "index.html"
                } else if (valid) {
                    localStorage.setItem('currentAccount', JSON.stringify({
                        username: currentUsername,
                        admin: false
                    }));
                    window.location.href = "index.html"
                } else {
                    for (var i = 0; i < objlength; i++) {
                        if (this.login_user != accountDetails[i].email) {
                            this.alert = 'username does not exist';
                        } else if ((this.login_user == accountDetails[i].email) && (this.login_pass != accountDetails[i].password)) {
                            this.alert = 'incorrect password';
                        } else {
                            this.alert = 'well how did we get here';
                        }
                    }
                }
            }
        }
    })
});