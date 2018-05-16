Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data:{
    articleVector: [],
    fullArticle: [],
    fullData: [],
    articleSelected: false,
    formData: {}
    },
    methods: {
        created: function () {
            this.$http
                .get('/blog')
                .then(response => {

                    this.fullData = response.data;
                    for (let article of this.fullData) {
                        this.data.articleVector.push([
                            article.id,
                            article.title,
                            article.content,
                            article.author,
                            article.date
                        ]);
                       
                    }
                }).catch(function (err) {
                    console.log(err.response);
                });
        },

        onView: function (id) {
            this.enableView(this.viewIndex.admin);
            this.clearList();
            var url = '/blog/' + id;
            this.$http
                .get(url)
                .then(response => {
                    this.fullArticle = response.data;
                    this.articleSelected = true;
                }).catch(function (err) {
                    console.log(err.response);
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
        clearList() {
            this.selectedRowIndex = null;
            this.data.splice(0, this.data.length);
        },
        enableView: function () {

            this.formData = {};
            articleSelected = false;
        },

    },


})