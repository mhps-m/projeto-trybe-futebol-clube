export const userMock = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const loginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const loginErrors = {
  missingFields: 'All fields must be filled',
  invalidFields: 'Invalid email or password',
  missingToken: 'Token not found',
  invalidToken: 'Token must be a valid token',
};

export const invalidEmailMock = {
  username: 'User',
  role: 'user',
  email: '@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

export const invalidEmailLoginMock = {
  email: '@user.com',
  password: 'secret_user',
};

export const invalidPasswordMock = {
  username: 'User',
  role: 'user',
  email: 'invalid.user@user.com',
  password: '$2a$10$HDkFwOMKOI6PTza0F7.YRu1Bqsqb9hx7XkuV7QeYB5dRL4z9DI1Mu',
};

export const invalidPasswordLoginMock = {
  email: 'invalid.user@user.com',
  password: '12345',
};
