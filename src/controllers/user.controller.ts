import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../services/user.service';
import sendEmail from '../utils/mailer';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createUser(body)

    await sendEmail({
      from: 'test@gamil.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `Verification code ${user.verificationCode}. Id: ${user._id}`,

    })

    return res.send("User successfully created")
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Account already exists');
    }

    return res.status(500).send(e)
  }
}
