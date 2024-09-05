
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Массив URL-адресов, по которым нужно пройтись
const urls = [
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=778A5910-2F5E-45AC-8A17-401CF17D7E9D",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=DADDC47F-D34B-436D-971B-8D2D407C9CD7",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=A7C7E957-F2AA-4264-8DCA-745C639549EE",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=F4266708-4878-4D45-8EC0-CCF2A4EB2B35",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=6D09C2BD-7D9E-42E5-BCBD-DF2CAE5AEA85",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=8B64CF32-5AE8-42BC-A688-597B1B5B6AC7",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=4E545FA3-89E3-43B8-8DC5-5D0B208595DF",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=C2690C83-36CC-416B-82CB-8E4DEADA66C9",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=1126749F-1148-48A6-A196-236870B46CED",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=0BE47AF4-0616-480C-9312-5E16CCE1E47E",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=FF9D010A-A19C-4C91-BD88-F9567481A40A",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=39100F2B-742D-4B0B-BEE3-132C0E21D28D",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=870582AB-0CA0-4286-BBBD-19ED0FF058BA",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=27CB6F35-8016-49A9-8C8E-0F5D7A6E2760",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=922303C3-7B0C-4C59-B149-F53856AEDE33",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=B6EDB037-BD2C-4ABB-B474-E103479671DB",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=6B05BF4F-2377-4A2B-8598-8A10828BD153",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=4E80ED82-D683-4CBB-972D-22287518D792",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=27FC919E-EB78-43D4-ABF1-4C4917A46E77",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=D4054855-F520-43AA-8181-364BEF1A3EC9",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=3333E368-99FB-418E-B590-3404B05237A3",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=6ADA7BBC-4256-45D3-A478-FD3A4F3C44CC",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=94E8D5D3-9DC1-423E-8CCA-D633E778EEAC",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=089245C7-C0DC-4534-9571-19B92C34603B",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=23E9724D-8EC9-4B18-9300-DAEDF6378D28",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=611EFC9E-D106-4087-B9F7-CE9F32F131A3",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=016264C4-334C-41A1-9815-20BEDB3190B9",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=524152B0-4590-4AC5-8E7E-29B6C0822CDD",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=FB208FDE-3AED-498C-8039-BFA7CC414241",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=7D4FE8BB-723D-4142-8004-9D6F92204CF4",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=CDC5869A-120E-407F-A183-29CA9AEBEFB1",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=F4BB13BE-49E4-4DED-95BE-2B1E5CA85AAE",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=0C5B5BEF-5A11-4612-ACCB-752600BD52C5",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=67C95F72-52BA-48E4-9C6B-6D5FFE2C78F6",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=7F5053D1-B4F2-4B52-AFF1-106CE6F46EFF",
  "https://www1.fips.ru/publication-web/publications/document?type=doc&tab=IZPM&id=8E5D3289-4D4B-4FA6-885D-5909ED9F1FB6"
];


// Асинхронная функция для обработки каждой страницы
async function processPage(url, browser) {
    const page = await browser.newPage();
    await page.goto(url);

    // Извлечения данных со страницы
    const data = await page.evaluate(() => {


      //Возвращает МПК
      function getMpk(){

        const sel = "html body#pub div#secondpages.container-fluid div.cont div.row div#mainpagecontent.col-md-9 div.cont div.globaltext div.class-search div div.left.minustop div.oneblock-number"
        const allMpk = document.querySelector(sel).children
        let mpkList = []

          for (let i = 0; i <= allMpk.length-1; i++){
            mpkList.push(allMpk[i].textContent.replace(/\s+/, ""))
          }
        return mpkList
      }
      
      // Возвращает авторов
      function getAuthor(){
        const sel = '#fullBibliographyDiv > p:nth-child(3)'
        const authorList = document.querySelector(sel)
    
        return authorList.textContent.replace("(72) Автор(ы):  ", "")
      }

      // Возвращает номер патента
      function getNum(){
        const letters = document.getElementsByClassName("oneletter")
        let txt = ""
        for (let i = 0; i < letters.length; i++){
          txt = txt.concat(letters[i].children[0].textContent, " ")
        }
        return txt.slice(0, -1)
      }
      
      // Возвращает название патента
      function getTitle(){
        const sel = "html body#pub div#secondpages.container-fluid div.cont div.row div#mainpagecontent.col-md-9 div.cont div.globaltext div.class-search div div#nameDiv p.B542 b"
        return document.querySelector(sel).textContent.replace(/\s+/, "").replaceAll('\n', '')
      }
      
      
      // Возвращает дату публикации (регистрации)
      function getDate(){
        return document.querySelector(".moretext > p:nth-child(4)").children[0].textContent
      }


      const mpk = getMpk()
      const authors = getAuthor()
      const number = getNum()
      const title = getTitle()
      const date = getDate()

      return {
        number : number,
        title : title,
        authors : authors,
        mpk : mpk,
        date : date
      };

    });

    await page.close();
    return data;
}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const results = [];

    for (const url of urls) {
        console.log(`Processing URL: ${url}`);
        const data = await processPage(url, browser);
        results.push(data);
    }

    await browser.close();
    return results;
})()
.then(results => {
    console.log('Results:', results);
    
    // Сохранение результатов в CSV файл
    const csvFilePath = path.join(__dirname, 'results_timur.csv');
    const csvHeader = 'number;title;authors;mpk;date\n'
    const csvContent = results.map(result => {
      return `${result.number};${result.title};${result.authors};${result.mpk.join(',')};${result.date}`;
  }).join('\n');
  
    
    fs.writeFileSync(csvFilePath, csvHeader + csvContent, 'utf8');
    console.log(`Results saved to ${csvFilePath}`);
})
.catch(error => {
    console.error('Error:', error);
});
