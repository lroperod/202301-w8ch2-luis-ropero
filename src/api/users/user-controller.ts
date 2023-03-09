import { RequestHandler } from 'express';
import { UserModel } from './user-schema.js';

export const getUserByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id }).exec();
  if (user !== null) {
    return res.json(user);
  }

  res.status(404);
};

export const updateUserByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const dbRes = await UserModel.updateOne({ _id: id }, { ...req.body }).exec();
  if (dbRes.matchedCount === 0) {
    res.status(404);
  }

  if (dbRes.modifiedCount === 1) {
    res.status(200).json({ msg: 'Su usuario ha sido modificado' });
  }
};
