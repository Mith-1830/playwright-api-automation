import { test, expect } from "@playwright/test";

test("DELETE CALL", async ({ request }) => {

  const authdata = {
    username: "admin",
    password: "password123"
  };

  const response = await request.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      headers: { "Content-Type": "application/json" },
      data: authdata
    }
  );

  const jsonresponse = await response.json();
  const jsontoken = jsonresponse.token;

  console.log("Token is:", jsontoken);
  expect(response.status()).toBe(200);


  const newbookingdata = {
    firstname: "MITHUN",
    lastname: "RI",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-01-01",
      checkout: "2030-01-01"
    },
    additionalneeds: "Breakfast"
  };

  const bookingresponse = await request.post(
    "https://restful-booker.herokuapp.com/booking",
    {
      headers: { "Content-Type": "application/json" },
      data: newbookingdata
    }
  );

  const jsonresp = await bookingresponse.json();
  const bookingID = jsonresp.bookingid;

  console.log("Booking ID is:", bookingID);
  expect(bookingresponse.status()).toBe(200);


const updatedbookingdata = {
    firstname: "MITHU",
    lastname: "RI",
    totalprice: 40000,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-02-01",
      checkout: "2026-03-01"
    },
    additionalneeds: "lunch"
  };



  const updateresponse = await request.put(
  "https://restful-booker.herokuapp.com/booking/" + bookingID,
  {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Cookie": `token=${jsontoken}`   
    },
    data: updatedbookingdata
  }
);

 const updatenewuser=await updateresponse.json()
 console.log(updatenewuser);

 expect(updateresponse.status()).toBe(200);

 const deleteresponse = await request.delete(
  "https://restful-booker.herokuapp.com/booking/" + bookingID,
   {
    headers:{"Content-Type": "application/json",
              "Cookie" :  `token=${jsontoken}`

  }}
);

console.log( deleteresponse.status());
console.log(deleteresponse.statusText());
expect([201, 204]).toContain(deleteresponse.status());
//expect(deleteresponse.statusText()).toBe("Created")

const getResponse = await request.get(
  "https://restful-booker.herokuapp.com/booking/" + bookingID
);

expect(getResponse.status()).toBe(404);
console.log(getResponse.status());


});