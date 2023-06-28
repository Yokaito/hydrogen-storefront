import {useEffect, useState} from 'react';

export const Home = () => {
  const [users, setUsers] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [inputName, setInputName] = useState<any>('');

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Something went wrong!');
      }
    };
    fetchAllUsers();
  }, []);

  const handleRemoveUser = (id: number) => {
    const newUsers = users.filter((user: any) => user.id !== id);
    setUsers(newUsers);
  };

  const handleAddUser = () => {
    const newUser = {
      id: Math.random(),
      name: inputName,
    };
    setUsers([...users, newUser]);
  };

  return (
    <>
      <h1>List of Users</h1>
      {error && <div>{error}</div>}
      {users ? (
        <ul>
          {users.map((user: any) => (
            <li key={user?.id}>
              {user?.name}
              <button
                data-testid={`remove-user-${user?.id}`}
                onClick={() => handleRemoveUser(user?.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
      <div>
        <input
          type="text"
          data-testid="input-name"
          onChange={(e) => setInputName(e.currentTarget.value)}
        />
        <button data-testid="add-user-button" onClick={handleAddUser}>
          Add User
        </button>
      </div>
    </>
  );
};
