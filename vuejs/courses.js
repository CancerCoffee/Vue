window.addEventListener('load', function() {


    new Vue({
        el: '#vue1',
        data: {

            courses: JSON.parse(localStorage['courses']),
            search: '',
            topic: [],
            location: [],
            sortBy: 'topic',
            filter: [],
        },
        computed: {
            uniqueCourse: function() {
                            var removedDupeCourse = [];
                            for (var i = 0; i < this.courses.length; i++) {
                                if (removedDupeCourse.indexOf(this.courses[i].location) === -1) {
                                    removedDupeCourse.push(this.courses[i].location)
                                }
                            }
                            return removedDupeCourse;
            },
            filteredCourse: function() {
                    return this.courses.filter((item) => {
                    return (this.search.length === 0 || item.topic.includes(this.search)) &&
                           (this.location.length === 0 || this.location.includes(item.location))
                }).sort((a, b) => {
                    if (this.sortBy == 'low'){
                         return a.price - b.price
                    }
                    else if (this.sortBy == 'high') {
                        return b.price - a.price
                    }
                    else {
                    return a[this.sortBy].toString().localeCompare(b[this.sortBy].toString())
                        }
                })
            }
        }

    });
});