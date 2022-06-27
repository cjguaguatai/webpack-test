import './banner.js'
import './tabs.js'
import $ from 'jquery';
$('#swiper').css('background-color', 'red')
import './style/index.css'
import './style/index.less'
import imgUrl from './assets/1.gif';

let img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);

// 引入图片-使用
import imgUrl1 from './assets/1.gif'
const theImg = document.createElement("img")
theImg.src = imgUrl1
document.body.appendChild(theImg)

import './assets/fonts/iconfont.css'

class App {
    static a = 123
}
  
console.log(App.a)