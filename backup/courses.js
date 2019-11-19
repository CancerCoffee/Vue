window.addEventListener('load', function() {


    new Vue({
        el: '#vue1',
        data: {

            courses: [

                    { 'topic': 'math', 'location': 'hendon', 'price': 100 },
                    { 'topic': 'math', 'location': 'colindale', 'price': 80 },
                    { 'topic': 'math', 'location': 'brent cross', 'price': 90 },
                    { 'topic': 'math', 'location': 'golders green', 'price': 120 },
                    { 'topic': 'english', 'location': 'hendon', 'price': 110 },
                    { 'topic': 'english', 'location': 'colindale', 'price': 90 },
                    { 'topic': 'english', 'location': 'brent cross', 'price': 90 },
                    { 'topic': 'english', 'location': 'golders green', 'price': 130 },
                    { 'topic': 'piano', 'location': 'hendon', 'price': 120 },
                    { 'topic': 'piano', 'location': 'golders green', 'price': 140 } 

                    ],
            search: '',
            topic: [],
            location: [],
            sortBy: 'topic',
            price: '',
        },
        computed: {
            mathCourses: function() {
                return this.courses.filter(function(course) {
                    return course.topic === 'math';
                });

            },
            filteredCourse: function() {
                if (this.price == 'low'){
                return this.courses.filter((item) => {
                    return (this.search.length === 0 || item.topic.includes(this.search)) &&
                           (this.location.length === 0 || this.location.includes(item.location))
                }).sort((a, b) => {
                    return a[this.sortBy].toString().localeCompare(b[this.sortBy].toString())
                }).sort((a, b) => {
                    return a.price - b.price
                })
             }
             else if (this.price == 'high'){
                    return this.courses.filter((item) => {
                    return (this.search.length === 0 || item.topic.includes(this.search)) &&
                           (this.location.length === 0 || this.location.includes(item.location))
                }).sort((a, b) => {
                    return a[this.sortBy].toString().localeCompare(b[this.sortBy].toString())
                }).sort((a, b) => {
                    return b.price - a.price
                })

             }
             else {
                    return this.courses.filter((item) => {
                    return (this.search.length === 0 || item.topic.includes(this.search)) &&
                           (this.location.length === 0 || this.location.includes(item.location))
                }).sort((a, b) => {
                    return a[this.sortBy].toString().localeCompare(b[this.sortBy].toString())
                })

             }
            }
        }

    });
});