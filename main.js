var app = new Vue({
    el: '#app',
    data: {
      isActive: true,
      items: null,
      tags: null,
      query: [],
      tag1: '',
      tag2: '',
      orSearch: '',
      stock: 0,
      word: '',
      seasons: [{
        value: '今日',
        label: '今日'
      }, {
        value: '今週',
        label: '今週'
      }, {
        value: '今月',
        label: '今月'
      }, {
        value: '半年',
        label: '半年'
      }, {
        value: '今年',
        label: '今年'
      }],
      value: '',
      message: ''
    },
    watch: {
      tag1: function(){
        this.query[0] = `tag:${this.tag1}`   
      },
      tag2: function(){
        this.query[1] = `tag:${this.tag2}`  
      },
      orSearch: function(){
        const val = this.orSearch ? 'OR' : null ;
        this.query[2] = val  
      },
      stock: function(){
        this.query[3] = `stocks:>${this.stock}`  
      },
      word: function(){
        this.query[4] = `body:${this.word} title:${this.word}` 
      },
      value: function(){
        let date = new Date()
        switch(this.value) { 
          case '今日':
            date.setDate(date.getDate() - 1);
            break; 
          case '今週':
            date.setDate(date.getDate() - 7);
            break;
          case '今月':
            date.setMonth(date.getMonth() - 1);
            break
          case '半年':
            date.setMonth(date.getMonth() - 6);
            break
          case '今年':
            date.setFullYear(date.getFullYear() - 1);
            break
        }
        var formatted_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`.replace(/\n|\r/g, '');
        this.query[5] =  `created:>${formatted_date} updated:>${formatted_date}`
      }
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
        this.message = 'loading....'
        let query = this.query.filter(v => v).join(' ')
        let params = {}
        params = {
          page: 1,
          per_page: 20,
          query: `${query}`   
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