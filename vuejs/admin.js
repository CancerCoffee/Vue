window.addEventListener('load', function() {


    new Vue({
        el: '#admin',
        data: {
            topic: '',
            location: '',
            price: '',
            course: [],
            courses: JSON.parse(localStorage['courses']),

        },
        methods: {
            submit: function() {
                this.course.push({
                    topic: this.topic,
                    location: this.location,
                    price: this.price
                })
                localStorage.setItem('courses', JSON.stringify(this.course));

                this.topic = '';
                this.location = '';
                this.price = '';
            }
        },
        computed: {
            coursesOutput: function() {
            	var check = JSON.parse(localStorage['currentAccount']).admin;
                if (check == false){
                    alert('you are not an admin');
                }
                else{
                return this.courses;
            }
            },
        }
    })
});