import {
  getUserByIdController,
  updateUserByIdController,
} from './user-controller';
import { Request, Response } from 'express';
import { User, UserModel } from './user-schema';

describe('Given a getUserByIdController', () => {
  const request = {
    params: { id: 'mockid' },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const newUser = {
    id: 'mockid',
    firstName: 'pepe',
    lastName: 'roldan',
    email: 'pepe@gmail.com',
    phone: '+34111000777',
    imgUrl: 'fjdfj.jpg',
  };

  test('When the user exits, it should respond a user', async () => {
    UserModel.findById = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(newUser),
    }));
    await getUserByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalledWith(newUser);
  });
  test('When the user do not exit, it shoud be response with status 404', async () => {
    UserModel.findById = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));

    await getUserByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(404);
  });
});

describe('Given an updateByIdController', () => {
  const newUser: User = {
    firstName: 'pepe',
    lastName: 'roldan',
    email: 'pepe@gmail.com',
    phone: '+34111000777',
    imgUrl: 'yo.jpg',
  };

  const request = {
    params: { id: 'validUserId' },
    body: newUser,
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  test('When the user exist, then it should response the user updated', async () => {
    UserModel.updateOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValueOnce({ modifiedCount: 1 }),
    }));

    await updateUserByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      msg: 'Su usuario ha sido modificado',
    });
    expect(UserModel.updateOne).toHaveBeenCalledWith(
      { _id: 'validUserId' },
      { ...request.body },
    );
  });

  test('When the user not exist, then it should response with not found', async () => {
    UserModel.updateOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValueOnce({ matchedCount: 0 }),
    }));

    await updateUserByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );

    expect(response.status).toHaveBeenCalledWith(404);
  });
});
