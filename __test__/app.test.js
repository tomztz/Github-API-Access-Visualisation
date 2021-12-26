const request =require('supertest');
const app =require('../app.js');
var express = require('express');

describe("run users router", () => {
    global.Headers = ()=>{'Content-Type', 'application/json'}
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/users");
        expect(response.statusCode).toBe(200)
      })

    test("should specify json in the content type header", async () => {
        const response = await request(app).get("/users");
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })


})