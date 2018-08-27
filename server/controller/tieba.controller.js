const request = require('request-promise-native');
const cheerio = require('cheerio');
const _l = require('lodash');


const config = require('../../config/index');
const logger = require('../../lib/log4js.lib');
const tools = require('../tools/index');



exports.doClimb = async function (ctx) {
  let onePost ={
    url:'http://tieba.baidu.com/p/5034380569',
    divTag:'#j_p_postlist > div'
  };

  let htmlBody = await request({
    method: 'get',
    url: onePost.url,
    headers: {
      'User-Agent': tools.requestHeader()
    },
  });

  // console.log(htmlBody);
  let $ = cheerio.load(htmlBody);

$(onePost.divTag).each(function (idx, element) {
  console.log(idx)
  let  $nickname = $('.d_name',element);
  let  $content = $('.d_post_content.j_d_post_content',element);
  let  $img = $('img',$content);
  let photoKeys = [];
  if($img.length>0){
    $img.each((id,one)=>{
      let onePhotoKey = $(one).attr('src');
      photoKeys.push(_l.trim(onePhotoKey))
    })
  }

  let $time = $('.p_tail',element);
  console.log(_l.trim($nickname.text()));
  console.log(_l.trim($content.text()));
  console.log(photoKeys);
})
  // $(oneResource.firstSign).each(function (idx, element) {
  //
  //   let $element = $(element);
  //   let firstSignID = $element.attr(oneResource.inWhatAttr);
  //   //获取章节数和章标题
  //   //这里做个判断并不是置顶的就一定会是小说，这些我们要排除
  //   if ($element.text().indexOf('第') < 0 || $element.text().indexOf('章') < 0) {
  //     return true;
  //   }
  //   let reg = new RegExp('第.*章');
  //   let dealString = tools.regTool.removeNaN(reg.exec($element.text())[0]);
  //
  //   let sectionNum = tools.chineseParser(dealString);
  //   console.log(sectionNum);
  //
  //   // if (sectionNum > parseInt(newestFactionNum)) {
  //   //   totalNewestNum++;
  //   //   var href = url.resolve(factionInfo.coreUrl, firstSignID);
  //   //   if (!myAppTools.isInArray(readyToBroswerUrls, href)) {
  //   //     readyToBroswerUrls.push(href);
  //   //   }
  //   //   var sectionTitle = $element.text().substring($element.text().indexOf('章') + 1).trim();
  //   //   var dealedDataElement = {
  //   //     sectionNum: sectionNum,
  //   //     sectionTitle: sectionTitle,
  //   //     url: href,
  //   //     sectionContent: '',
  //   //     upDateTime: new Date()
  //   //   };
  //   //   if (!myAppTools.isInArray(dealedData, dealedDataElement)) {
  //   //     dealedData.push(dealedDataElement);
  //   //   }
  //   // }
  // });
  // console.log($);
  ctx.body = {
    code: 200
  }
};