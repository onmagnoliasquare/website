import {createClient} from "@sanity/client";


const client = createClient({
  projectId: "1ah7xxlt", 
  dataset: "development", 
  apiVersion: '2024-03-12', 
  useCdn: true, 
})

export default client;