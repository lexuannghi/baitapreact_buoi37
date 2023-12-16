// StudentForm.js

import React, { useState, useEffect } from 'react';
import './studentform.css'; // Tạo file CSS để thiết lập màu sắc

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    maSV: '',
    hoTen: '',
    soDienThoai: '',
    email: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleAddStudent = () => {
    if (validateForm()) {
      if (editingIndex !== null) {
        // Nếu đang sửa sinh viên, cập nhật thông tin
        const updatedStudents = [...students];
        updatedStudents[editingIndex] = newStudent;
        setStudents(updatedStudents);
        setEditingIndex(null);
      } else {
        // Nếu không, thêm sinh viên mới
        setStudents((prevStudents) => [...prevStudents, { ...newStudent }]);
      }

      // Reset form
      setNewStudent({
        maSV: '',
        hoTen: '',
        soDienThoai: '',
        email: '',
      });
    }
  };

  const handleEditStudent = (index) => {
    // Bắt đầu chỉnh sửa sinh viên
    const studentToEdit = students[index];
    setNewStudent({ ...studentToEdit });
    setEditingIndex(index);
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    // Implement your form validation logic here
    // Return true if the form is valid, otherwise false
    return true;
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Thông tin sinh viên</h2>
        <form>
          <div className="d-flex">
            <div className="form1 row d-flex">
              <label style={{ width: '100%' }}>Mã SV:</label>
              <input style={{ marginBottom: '10px' }} type="text" name="maSV" value={newStudent.maSV} onChange={handleInputChange} />
              <label style={{ width: '100%' }}>Họ tên:</label>
              <input
                type="text"
                name="hoTen"
                value={newStudent.hoTen}
                onChange={handleInputChange}
              />
            </div>

            <div className="form2 row d-flex">
              <label style={{ width: '100%' }}>Số điện thoại:</label>
              <input style={{ marginBottom: '10px' }}
                type="text"
                name="soDienThoai"
                value={newStudent.soDienThoai}
                onChange={handleInputChange}
              />
              <label style={{ width: '100%' }}>Email:</label>
              <input
                type="text"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="button" onClick={handleAddStudent}>
            {editingIndex !== null ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
          </button>
        </form>
      </div>

      <div className="container search">
        <h2>Danh sách sinh viên</h2>
        <input style={{width: "100%"}}
          type="text"
          placeholder="Tìm kiếm theo tên"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th style={{paddingLeft: "25px"}}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.maSV}</td>
                <td>{student.hoTen}</td>
                <td>{student.soDienThoai}</td>
                <td>{student.email}</td>
                <td>
                  <button style={{ marginRight: '5px' }} onClick={() => handleEditStudent(index)}>Sửa</button>
                  <button onClick={() => handleDeleteStudent(index)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentForm;
