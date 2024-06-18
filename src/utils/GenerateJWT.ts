import jwt from 'jsonwebtoken';

/**
 * Generate JWT
 * @param {any} userId
 * @returns {Promise<any>}
 */
export const generateJWT = async (userId: any): Promise<any> => {
  // Promise
  return new Promise<any>((resolve, reject) => {
    // Received user id as payload
    const payload = { userId };
    // Sign JWT
    jwt.sign(
      payload,
      process.env.SECRET_KEY || '',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          reject(`Error while generating token: ${err}`);
        }
        resolve(token);
      },
    );
  });
};

export const decodeJWT = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY || '', (err, decoded) => {
      if (err) {
        reject(`Error while decoding token ${err} ${decoded}`);
      } else {
        resolve(decoded);
      }
    });
  });
};
