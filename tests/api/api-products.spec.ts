import { test, expect } from '@playwright/test';

test.describe("API Gateway Verification", () => {
    const baseUrl = "https://automationexercise.com/api";
    test("POST to searchProduct should return matching items", async ({request}) => {
        const response = await request.post(`${baseUrl}/searchProduct`, {
            form: {
                search_product: "tshirt"
            }
        });

        expect(response.status()).toBe(200); //Expect the response to be operational (200 OK)

        const responseBody = JSON.parse(await response.text());

        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.products).toBeDefined();
        expect(responseBody.products.length).toBeGreaterThan(0);

        //Validate against the first item of the returned products
        const firstProduct = responseBody.products[0];
        expect(firstProduct).toHaveProperty("id");
        expect(firstProduct).toHaveProperty("name");
        expect(firstProduct.name.toLowerCase()).toContain("tshirt");
    });
})