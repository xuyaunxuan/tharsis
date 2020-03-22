import Vue from 'vue'
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css'; 

Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
      hljs.highlightBlock(block)
    })
  })