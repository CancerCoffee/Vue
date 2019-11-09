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



});

