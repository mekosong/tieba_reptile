const request = require('request-promise-native');
const cheerio = require('cheerio');


const config = require('../config');
const logger = require('../lib/log4js.lib');
const tools = require('../tools');

exports.doNothing = async function(ctx){
  ctx.body={
    code:200,
    message:"I have not do anything !"
  }
};

exports.doClimb = async function (ctx) {
  const targetFiction = config.allFiction[0];

  const oneResource = targetFiction.allResources[0];
  let htmlBody = await request({
    method: 'get',
    url: oneResource.url,
    headers: {
      'User-Agent': tools.requestHeader()
    },
  });

  let $ = cheerio.load(htmlBody);
  $(oneResource.firstSign).each(function (idx, element) {

    let $element = $(element);
    let firstSignID = $element.attr(oneResource.inWhatAttr);
    //获取章节数和章标题
    //这里做个判断并不是置顶的就一定会是小说，这些我们要排除
    if ($element.text().indexOf('第') < 0 || $element.text().indexOf('章') < 0) {
      return true;
    }
    let reg = new RegExp('第.*章');
    let dealString = tools.regTool.removeNaN(reg.exec($element.text())[0]);

    let sectionNum = tools.chineseParser(dealString);
    console.log(sectionNum);

    // if (sectionNum > parseInt(newestFactionNum)) {
    //   totalNewestNum++;
    //   var href = url.resolve(factionInfo.coreUrl, firstSignID);
    //   if (!myAppTools.isInArray(readyToBroswerUrls, href)) {
    //     readyToBroswerUrls.push(href);
    //   }
    //   var sectionTitle = $element.text().substring($element.text().indexOf('章') + 1).trim();
    //   var dealedDataElement = {
    //     sectionNum: sectionNum,
    //     sectionTitle: sectionTitle,
    //     url: href,
    //     sectionContent: '',
    //     upDateTime: new Date()
    //   };
    //   if (!myAppTools.isInArray(dealedData, dealedDataElement)) {
    //     dealedData.push(dealedDataElement);
    //   }
    // }
  });
  // console.log($);
  ctx.body = {
    code: 200
  }
};