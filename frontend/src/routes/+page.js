import client from './sanityClient';

// export const get = async () => {

//   const article = await client.fetch(`*[_type == "article"]`);
  
// }

// return{
//   body:{article}
// }




export async function load({ fetch }) {
    const articleRes = await client.fetch("*[_type == 'article']");
    const articleData = await articleRes.json()
    const articles = articleData.article
    console.log("hello")
    if (articles) {
      return { articles: articles
        
      };
    }
    return {
      status: 500,
      body: new Error("Internal Server Error")
    };
  }

