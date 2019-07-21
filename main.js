var app = new Vue({
    el: '#app',
    data: {
      items: null,
      tags: null,
      tag1: '',
      tag2: '',
      orSearch: '',
      stock: 0,
      message: ''
    },
    created: function() {
      var vm = this
      axios.get('https://qiita.com/api/v2/tags?page=1&per_page=100&sort=count')
      .then(function(response) {
        vm.tags = response.data
      })
    },
    methods: {
      getAnswer: function() {
        const vm = this
        const val = vm.orSearch ? 'OR' : '' ;
        this.message = 'loading....'
        const params = {
                          page: 1,
                          per_page: 20,
                          query: 
                            `tag:${this.tag1}` + ' ' + 
                            val + ' ' +  
                            `tag:${this.tag2}` + ' ' +
                            `stocks:>${this.stock}`
                        }
        axios.get('https://qiita.com/api/v2/items', {params})
        .then(function(response) {
          console.log(response)
          vm.items = response.data
        })
        .catch(function(error) {
          vm.message = 'Error!' + error
        })
        .finally(function() {
          vm.message = ''
        })
      }
    }
})