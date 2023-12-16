// index.js hoặc App.js

import React from 'react';
import ReactDOM from 'react-dom';
import StudentForm from './Studentform';

const App = () => {
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Ứng dụng Quản lý Sinh viên</h1>
      <StudentForm />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
