import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

const bgVariants = [
  'from-emerald-400 to-emerald-500',
  'from-indigo-400 to-indigo-500',
  'from-amber-400 to-amber-500',
  'from-pink-400 to-pink-500',
  'from-cyan-400 to-cyan-500',
];

const App = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  // ================= GET ALL STUDENTS =================
  const getStudentAllData = () => {
    axios.get('http://localhost:3000/api/student')
      .then((res) => {
        setStudents(res.data.studentInfo);
      });
  };

  useEffect(() => {
    getStudentAllData();
  }, []);

  // ================= ADD / UPDATE =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, rollNo, classRoom, address } = e.target.elements;

    const studentData = {
      fullName: fullName.value,
      rollNo: rollNo.value,
      classRoom: classRoom.value,
      address: address.value,
      createdAt: new Date(),
    };

    // UPDATE
    if (editStudent) {
      axios
        .patch(
          `http://localhost:3000/api/student/${editStudent._id}`,
          studentData
        )
        .then(() => {
          setEditStudent(null);
          getStudentAllData();
        });
    }
    // ADD
    else {
      axios
        .post('http://localhost:3000/api/student', studentData)
        .then(() => {
          getStudentAllData();
        });
    }

    e.target.reset();
  };

  // ================= EDIT =================
  const handleStudentEdit = (student) => {
    setEditStudent(student);
  };

  // ================= DELETE =================
  const handleStudentDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/api/student/${id}`)
      .then(() => {
        if (editStudent && editStudent._id === id) {
          setEditStudent(null);
        }
        getStudentAllData();
      });
  };

  return (
    <section className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ================= TOP FORM ================= */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-slate-800">
            {editStudent ? 'Edit Student' : 'Add Student'}
          </h1>
          <p className="text-slate-500 mt-1">
            Student information form
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            <input
              name="fullName"
              placeholder="Full Name"
              defaultValue={editStudent?.fullName || ''}
              className="input"
              required
            />

            <input
              name="rollNo"
              type="number"
              placeholder="Roll No"
              defaultValue={editStudent?.rollNo || ''}
              className="input"
              required
            />

            <input
              name="classRoom"
              placeholder="Class Room"
              defaultValue={editStudent?.classRoom || ''}
              className="input"
              required
            />

            <input
              name="address"
              placeholder="Address"
              defaultValue={editStudent?.address || ''}
              className="input"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-medium transition"
            >
              {editStudent ? 'Update Student' : 'Add Student'}
            </button>
          </form>
        </div>

        {/* ================= STUDENT DATA ================= */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">
            Student Records
          </h2>

          {students.length === 0 ? (
            <p className="text-slate-400 text-center py-10">
              No students added yet
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student, index) => (
                <div
                  key={student._id}
                  className={`bg-gradient-to-br ${
                    bgVariants[index % bgVariants.length]
                  } text-white p-6 rounded-2xl shadow-md`}
                >
                  {/* NAME + ACTIONS */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      {student.fullName}
                    </h3>

                    <div className="flex gap-2">
                      {/* EDIT */}
                      <button
                        onClick={() => handleStudentEdit(student)}
                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleStudentDelete(student._id)
                        }
                        className="p-2 bg-red-500/80 rounded-lg hover:bg-red-600"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-4 text-sm space-y-1">
                    <p>
                      <b>Roll No:</b> {student.rollNo}
                    </p>
                    <p>
                      <b>Class:</b> {student.classRoom}
                    </p>
                    <p>
                      <b>Address:</b> {student.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default App;
