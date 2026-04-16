import { test, expect } from "@playwright/test";
import { json } from "node:stream/consumers";

test("Test Post API", async ({ request }) => {

    const authdata={
             "username" : "admin",
             "password" : "password123"
    }

   const response = await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":"application/json"}, data:authdata})
   console.log(response.status());
   const responsedata=await response.json();

   expect (response.status()).toBe(200);
   expect(responsedata.token).not.toBe(null);
   //expect(typeof body.token).toBe("String");
   
});

test("Test Post API with BookingID", async ({ request }) => {

    const Bookingdata={
            firstname: "Mithun",
            lastname: "RI",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
            checkin: "2026-01-01",
            checkout: "2026-01-01"
  },
            additionalneeds: "Dinner"
    }

   const response = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":"application/json"}, data:Bookingdata})
   console.log(response.status());
   const responsedata=await response.json();

   console.log(responsedata);

   expect(responsedata.bookingid).not.toBeNull()

   expect(responsedata.booking.firstname).toBe(Bookingdata.firstname)
   
   
});