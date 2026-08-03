import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe("Product API test exercises", () => {
    const baseUrl = "https://automationexercise.com/api";

    test("Get all products list (GET)", async ({request}) => {
        const response = await request.get(`${baseUrl}/productsList`);

        expect(response.status()).toBe(200); //http code
        const responseBody = await response.json(); 

        expect(responseBody.products).toBeDefined();
        expect(responseBody.products.length).toBeGreaterThan(0);

    });

    test("validate unsupported request method (POST to GET endpoint; not allowed", async ({request}) => {
        const response = await request.post(`${baseUrl}/productsList`, {
            form: {
                search_product: "tshirt"
            }
        });
    
        const responseBody = await response.json(); 
        expect(responseBody.responseCode).toBe(405);//response JSON code
        expect(responseBody.message).toContain("This request method is not supported");

    });

    test("search product via POST payload", async ({request}) => {
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

    test("missing search parameter", async ({ request }) => {
        const response = await request.post(`${baseUrl}/searchProduct`, {
            form: {

            }
        });

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toContain("Bad request, search_product parameter is missing in POST request.");
    });

    test("verify user authentication API", async ({ request}) => {
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

    test("get all brands list and validate schema", async ({request}) => {
        const response = await  request.get(`${baseUrl}/brandsList`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.brands.length).toBeGreaterThan(0);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.brands[0]).toHaveProperty("id");
        expect(responseBody.brands[0]).toHaveProperty("brand");
    })

    test("invalid login: user not found", async ({ request }) => {
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

    test("create user account via API", async ({ request }) => {
        const response = await request.post(`${baseUrl}/createAccount`, {
            form: {
                name: faker.person.fullName(),
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

    test("get user account detail by email", async ({ request }) => {
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