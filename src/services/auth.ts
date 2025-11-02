import { hashPassword, verifyPassword } from '../utils/password';
import { generateToken } from '../utils/token';
import { pool } from '../db';

export async function registerUser(email: string, password: string, fullName?: string) {
  const hashedPassword = await hashPassword(password);
  
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name',
    [email, hashedPassword, fullName]
  );
  
  const user = result.rows[0];
  const token = generateToken(user.id);
  
  await pool.query(
    'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'30 days\')',
    [user.id, token]
  );
  
  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const result = await pool.query(
    'SELECT id, email, password_hash, full_name FROM users WHERE email = $1',
    [email]
  );
  
  const user = result.rows[0];
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }
  
  const token = generateToken(user.id);
  await pool.query(
    'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'30 days\')',
    [user.id, token]
  );
  
  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name
    },
    token
  };
}

export async function logoutUser(token: string) {
  await pool.query('DELETE FROM sessions WHERE token = $1', [token]);
  return true;
}

export async function getCurrentUser(token: string) {
  const sessionResult = await pool.query(
    'SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()',
    [token]
  );
  
  if (!sessionResult.rows[0]) {
    throw new Error('Invalid or expired session');
  }
  
  const userResult = await pool.query(
    'SELECT id, email, full_name FROM users WHERE id = $1',
    [sessionResult.rows[0].user_id]
  );
  
  return userResult.rows[0];
}