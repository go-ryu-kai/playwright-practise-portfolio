import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe("Product API test exercises", () => {
    const baseUrl = "https://automationexercise.com/api";

    test("Get all products list (GET): API 1", async ({request}) => {
        const response = await request.get(`${baseUrl}/productsList`);

        expect(response.status()).toBe(200); //http code
        const responseBody = await response.json(); 

        expect(responseBody.products).toBeDefined();
        expect(responseBody.products.length).toBeGreaterThan(0);

    });


    test("validate unsupported request method (POST to GET endpoint; not allowed): API 2 ", async ({request}) => {
        const response = await request.post(`${baseUrl}/productsList`, {
            form: {
                search_product: "tshirt"
            }
        });
    
        const responseBody = await response.json(); 
        expect(responseBody.responseCode).toBe(405);//response JSON code
        expect(responseBody.message).toContain("This request method is not supported");

    });

    test("get all brands list: API 3", async ({ request }) => {
        const response = await request.get(`${baseUrl}/brandsList`);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.brands[0].brand).toContain("Polo");
    });

    test("PUT to all brands list: API 4", async ({ request }) => {
        const response = await request.put(`${baseUrl}/brandsList`, {
            data: {
                id: 1,
                body: 'This content has been completely replaced via Playwright PUT request.',
            }
        });
    
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(405);//response JSON code
        expect(responseBody.message).toContain("This request method is not supported");

    });

    test("search product via POST payload: API 5", async ({request}) => {
        const response = await request.post(`${baseUrl}/searchProduct`, {
            form: {
                search_product: "jean"
            }

        });

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        const hasMatchingProduct = responseBody.products.some((product: any) => 
            product.name.toLowerCase().includes("jean")
        );
        expect(hasMatchingProduct).toBe(true);
    
    });

    test("missing search parameter: API 6", async ({ request }) => {
        const response = await request.post(`${baseUrl}/searchProduct`, {
            form: {

            }
        });

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toContain("Bad request, search_product parameter is missing in POST request.");
    });

    test("verify login: API 7", async ({ request}) => {
        const response = await  request.post(`${baseUrl}/verifyLogin`, {
            form: {
                email: "playwrightpractise@cv.com",
                password: "playwright123"
            }
        });

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toContain("User exists!");

    });

    test("Post to verify login without email parameter: API 8", async ({ request}) => {
        const response = await request.post(`${baseUrl}/verifyLogin`, {
            form: {
                password: "youforgotyouremail"
            }
        });

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toContain("Bad request, email or password parameter is missing in POST request");

    });

    test("get all brands list and validate schema", async ({request}) => {
        const response = await  request.get(`${baseUrl}/brandsList`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.brands.length).toBeGreaterThan(0);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.brands[0]).toHaveProperty("id");
        expect(responseBody.brands[0]).toHaveProperty("brand");
    });

    test("DELETE to verify login: API 9", async ({ request }) => {
        const response = await request.delete(`${baseUrl}/verifyLogin`);
    
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toContain("This request method is not supported");

    });

    test("invalid login: user not found: API 10", async ({ request }) => {
        const response = await request.post(`${baseUrl}/verifyLogin`, {
            form: {
                email: "fake_nonexistent_bogus_email_67@domain.com",
                password: "idonotexist"
            }
        });

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toContain("User not found!");

    });

    test("create user account via API: API 11", async ({ request }) => {
        const response = await request.post(`${baseUrl}/createAccount`, {
            form: {
                name: faker.person.firstName(),
                email: faker.internet.exampleEmail(),
                password: 'SuperSecretPassword123!',
                title: 'Mr',
                birth_date: '15',
                birth_month: '08',
                birth_year: '1995',
                firstname: 'John',
                lastname: 'Doe',
                company: 'Acme Innovations',
                address1: '123 Main Street',
                address2: 'Suite 400',
                country: 'United States',
                zipcode: '90210',
                state: 'California',
                city: 'Beverly Hills',
                mobile_number: '+15551234567',
            }
        });

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(201);
    });

    test("delete method to delete user account: API 12", async ({ request }) => {
        const email = faker.internet.exampleEmail();
        const password = "password123";

        await request.post(`${baseUrl}/createAccount`, {
            form: {
                name: "Test User",
                email: email,
                password: password,
                title: "Mr",
                birth_date: "01",
                birth_month: "January",
                birth_year: "1990",
                firstname: "Test",
                lastname: "User",
                company: "QA Inc",
                address1: "123 Main St",
                address2: "Suite 100",
                country: "United States",
                state: "California",
                city: "Los Angeles",
                zipcode: "90001",
                mobile_number: "1234567890"
            }
        });

        const response = await request.delete(`${baseUrl}/deleteAccount`, {
            form: {
                email: email,
                password: password
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toContain("Account deleted!");
    });

    test("get user account detail by email: API 14", async ({ request }) => {
        const response = await request.get(`${baseUrl}/getUserDetailByEmail`, {
            params: {
                email: "playwrightpractise@cv.com"
            }
        });

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        //console.log(responseBody);
        expect(responseBody.user.email).toContain("playwrightpractise@cv.com");
        expect(responseBody.user.name).toContain("Playwright CV");


    });


})