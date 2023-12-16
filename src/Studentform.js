import React, { useState } from 'react';
import './studentform.css';

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
  const [formError, setFormError] = useState('');
  const [editingMode, setEditingMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const isStudentExists = () => {
    if (newStudent && newStudent.maSV) {
      const editedStudent = students[editingIndex];
      return (
        students.some(
          (student) =>
            student.maSV.toLowerCase() === newStudent.maSV.toLowerCase() &&
            (!editedStudent || newStudent.maSV.toLowerCase() !== editedStudent.maSV.toLowerCase())
        )
      );
    }
    return false;
  };
  
  const isPhoneNumberExists = () => {
    if (newStudent && newStudent.soDienThoai) {
      const editedStudent = students[editingIndex];
      return (
        students.some(
          (student) =>
            student.soDienThoai === newStudent.soDienThoai &&
            (!editedStudent || newStudent.soDienThoai !== editedStudent.soDienThoai)
        )
      );
    }
    return false;
  };
  
  const isEmailExists = () => {
    if (newStudent && newStudent.email) {
      const editedStudent = students[editingIndex];
      return (
        students.some(
          (student) =>
            student.email === newStudent.email &&
            (!editedStudent || newStudent.email !== editedStudent.email)
        )
      );
    }
    return false;
  };
  

  const handleAddStudent = () => {
    if (validateForm() && !isStudentExists() && !isPhoneNumberExists() && !isEmailExists()) {
      if (editingMode) {
        const updatedStudents = [...students];
        updatedStudents[editingIndex] = newStudent;
        setStudents(updatedStudents);
        setEditingIndex(null);
        setEditingMode(false);
      } else {
        setStudents((prevStudents) => [...prevStudents, { ...newStudent }]);
      }

      // Reset form
      setNewStudent({
        maSV: '',
        hoTen: '',
        soDienThoai: '',
        email: '',
      });
      setFormError('');
    } else if (!editingMode && isStudentExists()) {
      setFormError('Mã sinh viên đã tồn tại trong danh sách');
    } else if (!editingMode && isPhoneNumberExists()) {
      setFormError('Số điện thoại đã tồn tại trong danh sách');
    } else if (!editingMode && isEmailExists()) {
      setFormError('Email đã tồn tại trong danh sách');
    } else {
      setFormError('Vui lòng điền đầy đủ thông tin sinh viên');
    }
  };

  const handleEditStudent = (index) => {
    // Bắt đầu chỉnh sửa sinh viên
    const studentToEdit = students[index];
    setNewStudent({ ...studentToEdit });
    setEditingIndex(index);
    setEditingMode(true);
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
    return (
      newStudent.maSV.trim() !== '' &&
      newStudent.hoTen.trim() !== '' &&
      newStudent.soDienThoai.trim() !== '' &&
      newStudent.email.trim() !== ''
    );
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Thông tin sinh viên</h2>
        <form>
          <div className="d-flex">
            <div className="form1 row d-flex">
              <label style={{ width: '100%' }}>Mã SV:</label>
              <input type="text" name="maSV" value={newStudent.maSV} onChange={handleInputChange} />
              
              <label style={{ width: '100%', marginTop: '12px' }}>Họ tên:</label>
              <input
                type="text"
                name="hoTen"
                value={newStudent.hoTen}
                onChange={handleInputChange}
              />
            </div>

            <div className="form2 row d-flex">
              <label style={{ width: '100%' }}>Số điện thoại:</label>
              <input
                type="text"
                name="soDienThoai"
                value={newStudent.soDienThoai}
                onChange={handleInputChange}
              />
              
              <label style={{ width: '100%', marginTop: '15px' }}>Email:</label>
              <input
                type="text"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
              />
              
            </div>
          </div>

          <button type="button" onClick={handleAddStudent}>
            {editingMode ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
          </button>

          {formError && <p style={{ color: 'red' }}>{formError}</p>}
        </form>
      </div>

      <div className="container search">
        <h2>Danh sách sinh viên</h2>
        <input
          style={{ width: '100%' }}
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
              <th style={{ paddingLeft: '25px' }}>Thao tác</th>
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
                  <button
                    style={{ marginRight: '5px' }}
                    onClick={() => handleEditStudent(index)}
                  >
                    Sửa
                  </button>
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
