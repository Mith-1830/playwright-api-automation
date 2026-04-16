const { test, expect } = require("@playwright/test");

let userid;

test.describe.serial("API flow", () => {

  test("GET request", async ({ request }) => {
    const response = await request.get("http://localhost:3000/students");

    const body = await response.json();
    console.log(body);

    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  test("POST request", async ({ request }) => {
    const postresponse = await request.post("http://localhost:3000/students", {
      data: {
        name: 'Malathi',
        location: 'USA',
        phone: '9876543217',
        courses: ['Python', 'APItesting']
      }
    });

    const result = await postresponse.json();
    userid = result.id;

    console.log("Created ID:", userid);

    expect(postresponse.status()).toBe(201);
  });

  test("PUT request", async ({ request }) => {
    const putresponse = await request.put(
      `http://localhost:3000/students/${userid}`,
      {
        data: {
          name: 'updated Malathi',
          location: 'USA',
          phone: '9876543217',
          courses: ['Python', 'APItesting']
        }
      }
    );

    console.log(await putresponse.json());
    expect(putresponse.status()).toBe(200);
  });

  test("DELETE request", async ({ request }) => {
    console.log("Deleting ID:", userid);

    const deleteresponse = await request.delete(
      `http://localhost:3000/students/${userid}`
    );

    expect([200, 204]).toContain(deleteresponse.status());
  });

});

  
  
  


   




 
  