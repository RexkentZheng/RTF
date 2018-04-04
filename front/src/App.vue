<template>
  <div id="app">
    <div id="editorElem" style="text-align:left"></div>
    <button v-on:click="getContent">查看内容</button>
    <button @click="saveInfo()">存储信息</button>
    <div v-if="longText" v-html="longText"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import wangeditor from 'wangeditor'
import axios from 'axios'

export default {
      name: 'editor',
      data () {
        return {
          editorContent: '',
          longText:''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        },
        saveInfo:function () {
          console.log(this.editorContent)
          axios.post('/articles',{
            content:this.editorContent
          }).then((response)=>{
            let res = response.data;
            this.longText = res.result.articleContent;
          })
        }
      },
      mounted() {
        var editor = new wangeditor('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()
      }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
