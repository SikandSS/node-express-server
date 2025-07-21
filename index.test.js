const request = require('supertest');
const express = require('express');
const app = require('./index');

describe('Express App', () => {
  it('should return Hello, World! on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello, World!');
  });
}); 