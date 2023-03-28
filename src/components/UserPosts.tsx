import React, { type FunctionComponent, useEffect, useState } from 'react';
import { getUserAndPosts } from '../UserApiClient';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/UserPosts.css';
import PropagateLoader from 'react-spinners/PropagateLoader';
import EditUserNameModal from './EditUserNameModal';
import EmptyState from './EmptyState';
import { type User } from '../interfaces/User';
import { type Post } from '../interfaces/Post';

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
      const response = await getUserAndPosts(userId!);
      console.log(response);
      setUserPosts(response[0] as Post[]);
      setUser(response[1] as User);
      setLoadingSuccess(true);
    };

    const timer = setTimeout(() => {
      loadPosts()
        .catch((e) => {
          setLoadingSuccess(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
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
          <PropagateLoader loading aria-label="Loading Spinner" color={'#6161D6'} />
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
