import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string; // Например, девичья фамилия (необязательное поле)
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then((data: { users: User[] }) => {
        console.log(data); // Просмотрим данные в консоли
        if (Array.isArray(data.users)) { // Проверяем структуру данных
          const formattedData = data.users.map((user: User) => ({
            id: user.id,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            maidenName: user.maidenName || 'Нет информации',
            age: user.age || 0,
            gender: user.gender || '',
            email: user.email || '',
            phone: user.phone || '',
            username: user.username || '',
            image: user.image || ''
          }));
          setUsers(formattedData);
        } else {
          console.error('Получены некорректные данные');
        }
      })
      .catch(error => {
        console.error('Произошла ошибка при загрузке данных:', error);
      });
  }, []);

  const cellStyle = {
    border: '1px solid #000',
    padding: '8px',
  };

  return (
    <div>
      <h1>Список пользователей</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #000' }}>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Имя</th>
            <th style={cellStyle}>Фамилия</th>
            <th style={cellStyle}>Девичья фамилия</th>
            <th style={cellStyle}>Возраст</th>
            <th style={cellStyle}>Пол</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Телефон</th>
            <th style={cellStyle}>Логин</th>
            <th style={cellStyle}>Аватар</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #000' }}>
              <td style={cellStyle}>{user.id}</td>
              <td style={cellStyle}>{user.firstName}</td>
              <td style={cellStyle}>{user.lastName}</td>
              <td style={cellStyle}>{user.maidenName ? user.maidenName : "Нет информации"}</td>
              <td style={cellStyle}>{user.age}</td>
              <td style={cellStyle}>{user.gender}</td>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>{user.phone}</td>
              <td style={cellStyle}>{user.username}</td>
              <td style={cellStyle}><img src = {user.image}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;