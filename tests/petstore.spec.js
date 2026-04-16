import {test , expect} from "@playwright/test"
import { log } from "node:console"

test("Test Get API" , async ({request})=>{

   const  resp =await request.get("https://petstore.swagger.io/v2/pet/findByStatus?status=available")
   console.log(resp)

   const respstatus= await resp.status()
   console.log(respstatus);

   const statustextt= await resp.statusText()
   console.log(statustextt);

   expect(respstatus).toBe(200)

   const jsondata = await resp.json()
   console.log(jsondata);

   //expect(jsondata.id).toBe(99999)
   //expect(jsondata.userId).toBe(1)
   //expect(jsondata.title).toContain("sunt aut facere repellat")

   


})