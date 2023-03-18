import axios from 'axios';
import { type User } from './interfaces/User';
import { type Post } from './interfaces/Post';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
  // timeout: 1000
});

function getUsers (): Promise<User[]> {
  return instance
    .get('users')
    .then(res => {
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Status is ${res.status}`);
      }
    });
}

function getPosts (userId: string): Promise<Post[]> {
  return instance
    .get(`posts?userId=${userId}`)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Status is ${res.status}`);
      }
    });
}

function getUser (userId: string): Promise<User> {
  return instance
    .get(`users/${userId}`)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Status is ${res.status}`);
      }
    });
}

function getUserAndPosts (userId: string): Promise<Array<Post[] | User>> {
  return Promise.all([getPosts(userId), getUser(userId)]);
}

function updateUserName (userId: number, editedUserName: string): Promise<User> {
  return instance
    .patch(`users/${userId}`, { username: editedUserName })
    .then(res => {
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Status is ${res.status}`);
      }
    });
}

export { getUsers, getUserAndPosts, updateUserName };
