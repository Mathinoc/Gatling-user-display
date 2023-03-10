import axios, { type AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 1000
});

function getUsers (): Promise<void | AxiosResponse<any, any>> {
  return instance
    .get('users')
    .catch((error: Error) =>
      console.log('Error from service while getting user information: ', error)
    );
}

function getPosts (userId: string): Promise<void | AxiosResponse<any, any>> {
  return instance
    .get(`posts?userId=${userId}`)
    .catch((error: Error) =>
      console.log('Error from service while getting user posts: ', error)
    );
}

function getUser (userId: string): Promise<void | AxiosResponse<any, any>> {
  return instance
    .get(`users/${userId}`)
    .catch((error: Error) =>
      console.log('Error from service while getting user info: ', error)
    );
}

function getUserAndPosts (userId: string): Promise<[void | AxiosResponse<any, any>, void | AxiosResponse<any, any>]> {
  return Promise.all([getPosts(userId), getUser(userId)]);
}

function updateUserName (userId: number, editedUserName: string): Promise<void | AxiosResponse<any, any>> {
  return instance
    .patch(`users/${userId}`, { username: editedUserName })
    .catch((error: Error) =>
      console.log('Error from service while updating username: ', error)
    );
}

export { getUsers, getUserAndPosts, updateUserName };
