window.addEventListener('load', function() {

var courses = [];
var sP = [];

    new Vue({
        el: '#admin',
        data: {
            topic: '',
            location: '',
            price: '',
            time: '',
            duration: '',
            admin: true,
            serviceProvider: sP,
            selected: 'am',
        },
        methods: {
            submit: function() {
                courses.push({
                    topic: this.topic,
                    location: this.location,
                    price: this.price,
                    time: this.time,
                    duration: this.duration,
                    ampm: this.selected,
                    serviceProvider: sP,
                })
                localStorage.setItem('courses', JSON.stringify(courses));
                fetch(`http://localhost:3000/activity/lessons/`, {
                    method: 'post',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(({
                    topic: this.topic,
                    location: this.location,
                    price: this.price,
                    time: this.time,
                    duration: this.duration,
                    ampm: this.selected,
                    serviceProvider: sP,
                }))
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.log('try again'))

                this.topic = '';
                this.location = '';
                this.price = '';
                this.time = '';
                this.duration = '';
            },
            removeCourse: function(course) {
    			var index = courses.findIndex(c => c === course)
    			courses.splice(index, 1)
    			localStorage.setItem('courses', JSON.stringify(courses));
    		},
    		editCourse: function(course) {
    			var append = {
    				topic: this.topic,
                    location: this.location,
                    price: this.price,
                    serviceProvider: sP,};
    			var index = courses.findIndex(c => c === course)
    			courses.splice(index, 1, append)
    			localStorage.setItem('courses', JSON.stringify(courses));
    		}
        },
        computed: {

            coursesOutput: function() {
            	if (localStorage.getItem('currentAccount') !== null){
            	var check = JSON.parse(localStorage['currentAccount']).admin;
                if (check == false){
                	this.admin = false;
                }
                else{
                	if (localStorage.getItem('courses') !== null){
                		courses = JSON.parse(localStorage['courses'])
                		sP = JSON.parse(localStorage['currentAccount']).username;
                	}
                	else {
                		courses = [];
                		sP = JSON.parse(localStorage['currentAccount']).username;
                	}
                return courses.filter((item) => {
                	return (item.serviceProvider.includes(sP));
                })
            }
        	}
        	else {
        		window.location.href = "index.html"
        	}
            },
        }
    })
});