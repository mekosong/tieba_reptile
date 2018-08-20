let str = '<ul id="fruits">\n' +
  '  <li class="apple"><b class="a">dd</b>Apple</li>\n' +
  '  <li class="orange"><b>dd</b>Orange</li>\n' +
  '  <li class="pear"><b>dd</b>Pear</li>\n' +
  '</ul>';


let str1 = '<div id="post_content_105435723006" class="d_post_content j_d_post_content  clearfix">            分享【极客学院】VIP视频，还有F码分享。<br><img class="BDE_Image" pic_type="0" width="560" height="226" src="http://imgsrc.baidu.com/forum/w%3D580/sign=39c5de2ede2a60595210e1121836342d/676350ec54e736d147e4beef92504fc2d76269cb.jpg" size="214577" style="cursor: url(&quot;http://tb2.bdstatic.com/tb/static-pb/img/cur_zin.cur&quot;), pointer;"><br><img class="BDE_Image" pic_type="0" width="560" height="446" src="http://imgsrc.baidu.com/forum/w%3D580/sign=2fa8560d88cb39dbc1c0675ee01709a7/e67f981bb051f819747431add3b44aed2f73e776.jpg" style="cursor: url(&quot;http://tb2.bdstatic.com/tb/static-pb/img/cur_zin.cur&quot;), pointer;"><br><img class="BDE_Image" pic_type="0" width="560" height="226" src="http://imgsrc.baidu.com/forum/w%3D580/sign=2a1eeef3b199a9013b355b3e2d940a58/3495314c510fd9f9e204678e2c2dd42a2934a4b7.jpg" style="cursor: url(&quot;http://tb2.bdstatic.com/tb/static-pb/img/cur_zin.cur&quot;), pointer;"><br><img class="BDE_Image" pic_type="0" width="560" height="296" src="http://imgsrc.baidu.com/forum/w%3D580/sign=8074367ac2ef76093c0b99971edca301/02397d4e9258d1093f5e9b55d858ccbf6d814d01.jpg" style="cursor: url(&quot;http://tb2.bdstatic.com/tb/static-pb/img/cur_zin.cur&quot;), pointer;"></div>'

let $ = require('cheerio');
let b =  $('.d_post_content.j_d_post_content', str1);
let c = $('img',b);

console.log(typeof c);
// console.log(c[0]);

c.each((id,one)=>{
  console.log($(one).attr('src'))
})
// console.log(b.text());