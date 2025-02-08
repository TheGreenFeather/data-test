import { useState, useEffect } from 'react';
import Navbar from '../components/navBar';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function TeacherDashboard({ db, str }) {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [file, setFile] = useState(null);
  const [assignmentDetails, setAssignmentDetails] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const studentCollection = await getDocs(collection(db, 'students'));
      const assignmentCollection = await getDocs(collection(db, 'assignments'));

      setStudents(studentCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setAssignments(assignmentCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, [db]);

  const addStudent = async () => {
    const studentName = prompt('Enter student name:');
    if (studentName) {
      await addDoc(collection(db, 'students'), { name: studentName });
      setStudents([...students, { name: studentName }]);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addAssignment = async () => {
    if (!assignmentDetails) {
      alert('Please enter assignment details');
      return;
    }

    const assignmentData = {
      details: assignmentDetails,
      fileUrl: null, // Placeholder for file URL
    };

    // Upload file if selected
    if (file) {
      const storageRef = ref(str, file.name);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      assignmentData.fileUrl = url; // Set the file URL in assignment data
    }

    await addDoc(collection(db, 'assignments'), assignmentData);
    setAssignments([...assignments, assignmentData]);
    setAssignmentDetails(''); // Reset assignment details
    setFile(null); // Reset file selection
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>

      <button onClick={addStudent} className="bg-green-500 px-4 py-2 mt-4 rounded">Add Student</button>

      <h2 className="text-xl mt-6">Add Assignment</h2>
      <input
        type="text"
        value={assignmentDetails}
        onChange={(e) => setAssignmentDetails(e.target.value)}
        placeholder="Enter assignment details"
        className="border rounded px-2 py-1"
      />
      <input type="file" onChange={handleFileChange} className="mt-2" />
      <button onClick={addAssignment} className="bg-blue-500 px-4 py-2 mt-2 rounded">Add Assignment</button>

      <h2 className="text-xl mt-6">Students</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index} className="text-gray-400">{student.name}</li>
        ))}
      </ul>

      <h2 className="text-xl mt-6">Assignments</h2>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index} className="text-gray-400">
            {assignment.details} {assignment.fileUrl && <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer">[View File]</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;    