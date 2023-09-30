import { conn } from '../db.js';

export const getEvents = async (req, res) => {
  try {
    const [rows] = await conn.query('SELECT * FROM event');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const id = req.body.id;

    const [rows] = await conn.query('SELECT * FROM event WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export const getAvailableEvents = async (req, res) => {
  try {
    const [rows] = await conn.query('SELECT * FROM event WHERE state = 1 AND start_date >= CURRENT_TIMESTAMP');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await conn.query(
      `SELECT * FROM EVENT E
       INNER JOIN user_event UE ON UE.event_id = E.id
       WHERE UE.user_id = ?`, [userId]);
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export const getUnregisteredEvents = async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await conn.query(
      `SELECT * FROM event
       WHERE event.id NOT IN (SELECT event_id FROM user_event WHERE user_id = ?)`, [userId]);
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const [rows] = await conn.query(
      `INSERT INTO event (title, description, location, start_date, end_date, time, min_Age)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.body.title,
        req.body.description,
        req.body.location,
        req.body.start_date,
        req.body.end_date,
        req.body.time,
        req.body.min_Age,
      ]
    );
    res.send({ rows });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      location,
      start_date,
      end_date,
      time,
      min_Age } = req.body;
    const [rows] = await conn.query(
      `UPDATE event SET 
       title = IFNULL(?, title),
       description = IFNULL(?, description),
       location = IFNULL(?, location),
       start_date = IFNULL(?, start_date),
       end_date = IFNULL(?, end_date),
       time = IFNULL(?, time),
       min_Age = IFNULL(?, min_Age)
       WHERE id = ?`,
      [
        title,
        description,
        location,
        start_date,
        end_date,
        time,
        min_Age,
        id
      ]
    );
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export const registerToEvent = async (req, res) => {
  try {
    const [rows] = await conn.query(
      'INSERT INTO user_event (user_id, event_id) VALUES (?, ?)',
      [
        req.body.user_id,
        req.body.event_id,
      ]
    );
    res.send({ rows });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export const unregisterToEvent = async (req, res) => {
  try {
    const [rows] = await conn.query(
      'DELETE FROM user_event WHERE user_id = ? AND event_id = ?',
      [
        req.body.user_id,
        req.body.event_id,
      ]
    );

    if (rows.affectedRows <= 0)
      return res.status(404).json({
        message: "User or event not found"
      });

    res.send({ rows });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
