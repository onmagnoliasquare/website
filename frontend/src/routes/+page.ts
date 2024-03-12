import {createClient} from "@sanity/client";

export const client = createClient{(
    projectId: "1ah7xxlt", 
    dataset: "development", 
    apiVersion: '2024-03-12', 
    useCdn: true, 
)
}

export async function load({ article }) {
    const data = await client.fetch(`*[_type == "article"]`);
  
    if (data) {
      return {
        article: data
      };
    }
    return {
      status: 500,
      body: new Error("Internal Server Error")
    };
  }

