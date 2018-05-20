Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data: {
        articleVector: [],
        fullArticle: [],
        articleSelected: false,
        formData: {},
        ids: []
    },
    created: function () {
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
                            date: new Date(article.date).toDateString(),
                            imagePath: article.imagePath
                        });
                    }
                    console.log(this.articleVector);
                }).catch(function (err) {
                    console.log(err);
                });
        },
        uploadImage: function (e) {
           
            var files = e.target.files || e.dataTransfer.files;
            this.formData.imagePath = files[0].name;
           },

        onView: function (id) {
            this.fullArticle=[];
            var url = '/blog/' + id;
            console.log("id-ul este",id);
            this.$http
                .get(url)
                .then(response => {
                    console.log(response.data);

                    this.fullArticle.push({

                        title: response.data.title,
                        author: response.data.author,
                        content: response.data.content,
                        date: new Date(response.data.date).toDateString(),
                        imagePath: response.data.imagePath
                    });


                    this.articleSelected = true;
                }).catch(function (err) {
                    console.log(err);
                });
        }, onSubmit: function () {
           // console.log(this.formData.imagePath);
            this.$http
                .post('/blog', {

                    author: this.formData.author,
                    title: this.formData.title,
                    date: new Date(),
                    content: this.formData.content,
                    imagePath: this.formData.imagePath

                })
                .then(function (response) {
                     console.log(response);
                     window.location.reload(true);
                     this.articleVector = [];
                     doCreated();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },

    },


})