
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


async function getZillowData(url) {
    
    fetch(`https://api.scraperapi.com/?api_key=${process.env.SCRAPERAPI_KEY}&url={url}`)
    .then(async response => {
        const htmlData = await response.text()
        const dom = new JSDOM(htmlData);
   return (JSON.parse(dom.window.document.querySelector("#__NEXT_DATA__").textContent)) 
    })
      .catch(error => { 
        console.log(error)
      });
}

Bun.serve({
 fetch(req){
        const url = new URL(req.url)
        const urlParam = url.searchParams.get('url')

        if(!urlParam){
            return new Response('URL parameter is missing',{status:400})

        }
        const zillowData = getZillowData(urlParam)
        return new Response(JSON.stringify(zillowData))
   
    }
})

