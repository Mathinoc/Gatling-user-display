import React, { type FunctionComponent, useEffect, useState } from 'react';
import { getUserAndPosts } from '../UserApiClient';
import { useParams, useNavigate } from 'react-router-dom';
import { type AxiosResponse } from 'axios';
import '../styles/UserPosts.css';
import PropagateLoader from 'react-spinners/PropagateLoader';
import EditUserNameModal from './EditUserNameModal';
import EmptyState from './EmptyState';
import { type User } from '../interfaces/User';

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const UserPosts: FunctionComponent = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User | undefined>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSuccess, setLoadingSuccess] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadPosts = async (): Promise<void> => {
      const response = await getUserAndPosts(userId!) as [void | AxiosResponse<any, any>, void | AxiosResponse<any, any>];
      console.log(response);
      if (response && response[0]!.status === 200 && response[1]!.status === 200) {
        setUserPosts(response[0]!.data);
        setUser(response[1]!.data);
        setLoadingSuccess(true);
      }
      setLoading(false);
    };

    const timer = setTimeout(() => {
      loadPosts();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const userInfo = user && (
    <div className='UserPosts__user-info'>
      <p><span className='UserPosts__user-info--label'>Name:</span> {user.name}</p>
      <p><span className='UserPosts__user-info--label'>Username:</span> {user.username}</p>
      <button
        aria-label="username"
        onClick={() => setIsModalOpen(true)}
      >Edit</button>
    </div>
  );

  const postDisplay = userPosts.length > 0 &&
    (
      <table>
        <tbody>
          {userPosts.map(post => <tr key={post.id}>
            <td>
              <h3>{post.title}</h3>
              <article>{post.body}</article>
            </td>
          </tr>)}

        </tbody>
      </table>
    );

  return (
    <div className="UserPosts">
      {isModalOpen &&
        <EditUserNameModal setIsModalOpen={setIsModalOpen} user={user!} setUser={setUser} />
      }

      {loading &&
        <div className="UserList__loader">
          <PropagateLoader loading={loading} aria-label="Loading Spinner" color={'#6161D6'} />
        </div>
      }

      {!loading && <button onClick={() => navigate(-1)} className="UserPosts__home-button">Home page</button>}
      {userInfo}
      {postDisplay}

      {!loading && loadingSuccess && userPosts.length === 0 && <EmptyState text="This user doesn't have any post!" />}
      {!loading && !loadingSuccess && <EmptyState text="Couldn't load information" />}
    </div>
  );
};

export default UserPosts;
