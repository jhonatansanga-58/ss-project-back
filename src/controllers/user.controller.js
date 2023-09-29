import bcrypt from 'bcrypt';
import { conn } from '../db.js';

export const getUser = async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const [rows] = await conn.query('SELECT * FROM user WHERE name = ?', [name]);
  if (rows.length > 0) {
    const salt = rows[0].salt;
    const userPassword = rows[0].password;
    const isValid = await bcrypt.compare(password, salt + userPassword);
    if (isValid)
    return res.status(200).json({
      'message': 'Correct'
    });
    else
      return res.status(404).json({
        'message': 'Incorrect password'
      });
  }
  else
    return res.status(404).json({
      'message': 'Incorrect user name'
    });
};

export const createUser = async (req, res) => {
  const password = req.body.password;
  const salt = await bcrypt.genSaltSync(10);
  const hash = (await bcrypt.hash(password, salt)).replace(salt, '');
  const [rows] = await conn.query(
    'INSERT INTO user (name, email, salt, password, birthday) VALUES (?, ?, ?, ?, ?)',
    [
      req.body.name,
      req.body.email,
      salt,
      hash,
      req.body.birthday
    ]
  )
  res.send({ rows });
};

export const updateUser = (req, res) => res.send('put');

export const deleteUser = (req, res) => res.send('delete');