Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data:{
    articleVector: [],
    fullArticle: [],
    articleSelected: false,
    formData: {},
    ids: []
    },
    created : function() {
        this.doCreated();
    },
    methods: {
        doCreated: function () {
            this.$http
                .get('/blog')
                .then(response => {

                    for (let article of response.data) {
                        this.articleVector.push({
                            _id: article._id,
                            title: article.title,
                            content: article.content,
                            author: article.author,
                            date: article.date
                        });
                    }
                    console.log(this.articleVector);
                }).catch(function (err) {
                    console.log(err);
                });
        },

        onView: function (id) {
           
            var url = '/blog/' + id;
            console.log(id);
            this.$http
                .get(url)
                .then(response => {
                    console.log(response.data);
                   
                        this.fullArticle.push({
                         
                            title:response.data.title,
                            author:response.data.author,
                            content:response.data.content,
                            data:response.data.data
                    });
                    
                    
                    this.articleSelected = true;
                }).catch(function (err) {
                    console.log(err);
                });
        }, onSubmit: function () {
            this.$http
                .post('/blog', {
                    author: this.formData.author,
                    title: this.formData.title,
                    date: this.formData.date,
                    content:this.formData.content
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

    },


})