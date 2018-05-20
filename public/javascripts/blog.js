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
            console.log("1111111",e);

            // this.formData.imagePath = image.target.files[0] ;
            var files = e.target.files || e.dataTransfer.files;
            this.formData.imagePath = files[0].name;
            console.log("e este", e.target);
            console.log("formData.imagePath setat cu : ", this.formData.imagePath);

        },

        onView: function (id) {
            
            var url = '/blog/' + id;
            console.log(id);
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
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

    },


})