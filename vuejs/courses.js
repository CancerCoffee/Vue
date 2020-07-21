window.addEventListener('load', function() {



    new Vue({
        el: '#vue1',
        data: {

            courses: [],
            search: '',
            topic: [],
            location: [],
            sP: [],
            sortBy: 'topic',
            ampm: '',
        },
        computed: {
            getCourses: function(){
                fetch('http://localhost:3000/activity/lessons/', {mode: 'cors'})
                    .then((res) => res.json())
                    .then((data) => localStorage.setItem('courses', JSON.stringify(data)));
            },
            uniqueCourse: function() {
                            var removedDupeCourse = [];
                            var objlength = []
                            if (localStorage.getItem('courses') !== null){
                                objlength = Object.keys(JSON.parse(localStorage.getItem('courses'))).length;
                            }
                            for (var i = 0; i < objlength; i++) {
                                this.courses.push(JSON.parse(localStorage['courses'])[i]);
                                if (removedDupeCourse.indexOf(this.courses[i].location) === -1) {
                                    removedDupeCourse.push(this.courses[i].location)
                                }
                            }
                            return removedDupeCourse;
            },
            uniqueProvider: function() {
                            var removedServiceProvider = [];
                            var objlength = []
                            if (localStorage.getItem('courses') !== null){
                                objlength = Object.keys(JSON.parse(localStorage.getItem('courses'))).length;
                            }
                            for (var i = 0; i < objlength; i++) {
                                if (removedServiceProvider.indexOf(this.courses[i].serviceProvider) === -1) {
                                    removedServiceProvider.push(this.courses[i].serviceProvider)
                                }
                            }
                            return removedServiceProvider;
            },
            filteredCourse: function() {
                    return this.courses.filter((item) => {
                    return (this.search.length === 0 || item.topic.includes(this.search) || item.location.includes(this.search) || item.serviceProvider.includes(this.search)) &&
                           (this.location.length === 0 || this.location.includes(item.location)) &&
                           (this.sP.length === 0 || this.sP.includes(item.serviceProvider)) &&
                           (this.ampm.length === 0 || this.ampm.includes(item.ampm))
                }).sort((a, b) => {
                    if (this.sortBy == 'low'){
                         return a.price - b.price
                    }
                    else if (this.sortBy == 'high') {
                        return b.price - a.price
                    }
                    else if (this.sortBy == 'low1') {
                        return a.duration - a.duration
                    }
                    else if (this.sortBy == 'high1') {
                        return b.duration - a.duration
                    }
                    else if (this.sortBy == 'low2') {
                       return a.ampm.toString().localeCompare(b.ampm.toString()) && a.time - b.time
                    }
                    else if (this.sortBy == 'high2') {
                     return b.ampm.toString().localeCompare(a.ampm.toString()) && b.time - a.time
                    }
                    else {
                    return a[this.sortBy].toString().localeCompare(b[this.sortBy].toString())
                        }
                })
            }
        }

    });
});

/*
[{"topic":"math","location":"colindale","price":"80","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"math","location":"brent cross","price":"90","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"math","location":"golders green","price":"120","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"english","location":"hendon","price":"110","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"english","location":"colindale","price":"90","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"english","location":"brent cross","price":"90","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"english","location":"golders green","price":"130","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"piano","location":"hendon","price":"120","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"piano","location":"golders green","price":"140","serviceProvider":"yeet","duration":"40","time":"40"},
{"topic":"piano","location":"golders green","price":"140","serviceProvider":"yeet","duration":"40","time":"40"}] */