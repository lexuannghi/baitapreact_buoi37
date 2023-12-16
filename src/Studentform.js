import React, { useState } from "react";
import "./studentform.css";

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    maSV: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
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
          (student, index) =>
            student.maSV.toLowerCase() === newStudent.maSV.toLowerCase() &&
            (!editingMode || (editingMode && index !== editingIndex))
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
          (student, index) =>
            student.soDienThoai === newStudent.soDienThoai &&
            (!editingMode || (editingMode && index !== editingIndex))
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
          (student, index) =>
            student.email === newStudent.email &&
            (!editingMode || (editingMode && index !== editingIndex))
        )
      );
    }
    return false;
  };

  const handleAddStudent = () => {
    if (validateForm()) {
      if (editingMode) {
        const updatedStudents = [...students];
        const isDuplicate =
          students.some(
            (student, index) =>
              index !== editingIndex &&
              (student.maSV.toLowerCase() === newStudent.maSV.toLowerCase() ||
                student.soDienThoai === newStudent.soDienThoai ||
                student.email === newStudent.email)
          );
        if (!isDuplicate) {
          updatedStudents[editingIndex] = newStudent;
          setStudents(updatedStudents);
          setEditingIndex(null);
          setEditingMode(false);
          setFormError("");
        } else {
          setFormError("Thông tin bạn sửa bị trùng lặp với danh sách đã có");
        }
      } else {
        const isDuplicate = students.some(
          (student) =>
            student.maSV.toLowerCase() === newStudent.maSV.toLowerCase() ||
            student.soDienThoai === newStudent.soDienThoai ||
            student.email === newStudent.email
        );
        if (!isDuplicate) {
          setStudents((prevStudents) => [...prevStudents, { ...newStudent }]);
          setNewStudent({
            maSV: "",
            hoTen: "",
            soDienThoai: "",
            email: "",
          });
          setFormError("");
        } else {
          setFormError("Thông tin của bạn bị trùng lặp với danh sách đã có");
        }
      }
    } else {
      setFormError("Vui lòng điền đầy đủ thông tin sinh viên");
    }
  };

  const handleEditStudent = (index) => {
    // Bắt đầu chỉnh sửa sinh viên
    const studentToEdit = filteredStudents[index];
    setNewStudent({ ...studentToEdit });
    setEditingIndex(index);
    setEditingMode(true);
    setFormError("");
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
      newStudent.maSV.trim() !== "" &&
      newStudent.hoTen.trim() !== "" &&
      newStudent.soDienThoai.trim() !== "" &&
      newStudent.email.trim() !== ""
    );
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Thông tin sinh viên</h2>
        <form>
          <div className="d-flex">
            <div className="form1 row d-flex">
              <label style={{ width: "100%" }}>Mã SV:</label>
              <input type="text" name="maSV" value={newStudent.maSV} onChange={handleInputChange} />

              <label style={{ width: "100%", marginTop: "10px" }}>Họ tên:</label>
              <input
                type="text"
                name="hoTen"
                value={newStudent.hoTen}
                onChange={handleInputChange}
              />
            </div>

            <div className="form2 row d-flex">
              <label style={{ width: "100%" }}>Số điện thoại:</label>
              <input
                type="text"
                name="soDienThoai"
                value={newStudent.soDienThoai}
                onChange={handleInputChange}
              />

              <label style={{ width: "100%", marginTop: "15px" }}>Email:</label>
              <input
                type="text"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="button" onClick={handleAddStudent}>
            {editingMode ? "Cập nhật sinh viên" : "Thêm sinh viên"}
          </button>

          {formError && <p style={{ color: "red" }}>{formError}</p>}
        </form>
      </div>

      <div className="container search">
        <h2>Danh sách sinh viên</h2>
        <input
          style={{ width: "100%" }}
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
              <th style={{ paddingLeft: "25px" }}>Thao tác</th>
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
                  <button style={{ marginRight: "5px" }} onClick={() => handleEditStudent(index)}>
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
