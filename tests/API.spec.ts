import { test, expect, request } from '@playwright/test';

test.describe('Reqres API Automation Tests', () => {
  let apiContext;

  // Setup API Context
  test.beforeAll(async () => {
    apiContext = await request.newContext({
    });
  });

  // Test 1: GET Single User Information
  test('GET /users/1 - Single User Information', async () => {
    const response = await apiContext.get('https://reqres.in/api/users/1');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    // Assertion
    expect(responseBody.data.id).toBe(1);
    expect(responseBody.data.email).toBe('george.bluth@reqres.in');
    expect(responseBody.data.first_name).toBe('George');
    expect(responseBody.data.last_name).toBe('Bluth');
  });

  // Test 2: GET User Not Found
  test('GET /users/23 - User Not Found', async () => {
    const response = await apiContext.get('https://reqres.in/api/users/23');
    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    console.log(responseBody);

    // Assertion
    expect(responseBody).toEqual({}); // Body should be empty object or 404
  });

  // Test 3: POST Login Successful
  test('POST /login - Successful Login', async () => {
    const response = await apiContext.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    // Assertion
    expect(responseBody.token).toBe('QpwL5tke4Pnpja7X4');
  });

});
