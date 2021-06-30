import '../css/app.css';

window.Vue = require('vue');

// データ定義
var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

// コンポーネント定義
Vue.component(
  // コンポーネント名
  'item',
  // オプション
  { 
    // テンプレート
    template: '#item-template', // "text/x-template"のid
    // 親から子へのデータの受け渡し
    props: {
      model: Object
    },
    // UIの状態・データ（関数である必要あり）
    data: function () {
      return {
        open: false
      }
    },
    // データから派生して算出される値
    computed: {
      isFolder: function () {
        return this.model.children &&
          this.model.children.length
      }
    },
    // eventが発生した時などの振る舞い
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      changeType: function () {
        if (!this.isFolder) {
          Vue.set(this.model, 'children', [])
          this.addChild()
          this.open = true
        }
      },
      addChild: function () {
        this.model.children.push({
          name: 'new stuff'
        })
      }
    }
})

// Vueインスタンス生成
var demo = new Vue({
  // Vueインスタンスをマウントする要素
  el: '#demo',
  // UIの状態・データ（関数である必要あり）
  data: {
    treeData: data
  }
})

// define the item component
Vue.component('item2', {
  template: '#item-template2',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#demo2',
  data: {
    treeData: data
  }
})