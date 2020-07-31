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
                } else {
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
            sub_log_server: function(){
                var emailinput = this.login_user;
                var pwinput = this.login_pass;
                fetch('http://localhost:3000/activity/users/', {mode: 'cors'})
                    .then((res) => res.json())
                    .then(function(data){
                        var accountDetails = data;
                        var objlength = accountDetails.length;
                        var valid = false;
                        var admin = false;
                        var currentUsername = [];
                        for (var i = 0; i < objlength; i++) {
                            if ((emailinput == accountDetails[i].email) && (pwinput == accountDetails[i].password)) {
                                valid = true;
                                var currentUsername = accountDetails[i].username;
                                console.log(emailinput);
                            }
                            if ((emailinput == accountDetails[i].email) && ('admin' == accountDetails[i].type)){
                                admin = true;
                            }
                        }
                        if ((valid == true) && (admin == true)) {
                            localStorage.setItem('currentAccount', JSON.stringify({
                                username: currentUsername,
                                admin: true
                            }));
                            window.location.href = "index.html"
                        } else if ((valid == true) && (admin == false)){
                            localStorage.setItem("currentAccount", JSON.stringify({
                                username: currentUsername,
                                admin: false
                            }));
                            window.location.href = "index.html"
                        } else {
                            for (var i = 0; i < objlength; i++) {
                                if (emailinput != accountDetails[i].email){
                                    this.alert='no account exists';
                                    console.log("no account");
                                    console.log(emailinput);
                                } else if ((emailinput == accountDetails[i].email) && (pwinput != accountDetails[i].password)){
                                    this.alert='incorrect password';
                                    console.log("wrong pw");
                                } else {
                                    this.alert='what'
                                    console.log("fuck");
                                }
                            }
                        }
                    });
            }
        }
    })
});