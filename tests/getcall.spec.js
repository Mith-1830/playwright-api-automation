import {test , expect} from "@playwright/test"
import { log } from "node:console"

test("Test Get API" , async ({request})=>{

   console.log("auto trigger test"); 

   const  response =await request.get("https://jsonplaceholder.typicode.com/posts/1")
   console.log(response)

   const jsonresponse = await response.json()
   console.log(jsonresponse);

   const headerresponse = response.headers()
   console.log(headerresponse)

   const headerresponsearray = response.headersArray()
   console.log(headerresponsearray);

   const statusresponse = response.status()
   console.log(statusresponse);

   const statustextresponse = response.statusText()
   console.log(statustextresponse);

   expect(statusresponse).toBe(200)
   expect(statustextresponse).toBe("OK")
   expect(response.ok()).toBeTruthy
   expect(jsonresponse).toHaveProperty("userId",1)
   expect(jsonresponse).toHaveProperty("id",1)
   expect(jsonresponse.body).toContain("quia et suscipit")
     
     
    
    

   


})