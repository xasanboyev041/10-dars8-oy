import { GetStaticProps } from 'next';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import styles from './Users.module.css';

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

type AdminUsersPageProps = {
  users: User[];
};

const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ users }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();  
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return (
      <div className={styles.container}>
        <h1>Admin - Users</h1>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id} className={styles.user}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.username}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null; 
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://fakestoreapi.com/users');
  const users: User[] = await res.json();
  return { props: { users } };
};

export default AdminUsersPage;
