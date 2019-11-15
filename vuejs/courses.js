window.addEventListener('load', function() {


new Vue({
                el: '#vue1',
                data: {
                    search: '',
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
                },
                computed: {
                    mathCourses: function() {
                        return this.courses.filter(function (course) {
                            return course.topic === 'math';
                        });

                    },
                    hendonCourses: function(){
                        return this.courses.filter(function (course){
                            return course.location === 'hendon';
                        });
                    },
                    filteredCourse(){
                        if (this.search != '') {
                        return this.courses.filter(course => {
                            return course.topic.indexOf(this.search.toLowerCase()) >= 0
                            || course.location.indexOf(this.search.toLowerCase()) >= 0
                        })}
                        else {return;};
                    }
                }

            });
});