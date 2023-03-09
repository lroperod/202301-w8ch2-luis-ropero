import { Request, Response } from 'express';

import { errorHandler } from './error-handler.js';

describe('Given an errorHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test('Should return a 500 status code and an error message if the error is not a validation error', () => {
    const mockError = new Error('An error occurred');
    errorHandler(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith('An error occurred');
  });
});
