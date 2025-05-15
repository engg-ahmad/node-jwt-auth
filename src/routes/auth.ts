import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user';

const jwtSecret = process.env.JWT_SECRET_KEY;

const router = Router();

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  
  try {
    const user = await User.getUserByEmail(email)
    if (!user) return res.status(401).json({ message: 'User does not exist' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Password is incorrect' });

    if (!jwtSecret) return res.status(500).json({ message: 'JWT secret is not defined' });
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
  
    return res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Login Failed' });
    console.error('Error during login:', error);
  }
})

router.post('/signup', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.getUserByEmail(email)
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser({ email, password: hashedPassword });

    if (!jwtSecret) return res.status(500).json({ message: 'JWT secret is not defined' });
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
  
    return res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Registration Failed' });
    console.error('Error during registration:', error);
  }
});

export default router;