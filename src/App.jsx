import { useState, useEffect } from 'react';
import Navbar from './components/navBar'; 
import { collection, getDocs, addDoc } from 'firebase/firestore';

function App({ db }) {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [mockTests, setMockTests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const teacherCollection = await getDocs(collection(db, 'teachers'));
      const studentCollection = await getDocs(collection(db, 'students'));
      const eventCollection = await getDocs(collection(db, 'events'));
      const mockTestCollection = await getDocs(collection(db, 'mockTests'));

      setTeachers(teacherCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setStudents(studentCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setEvents(eventCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setMockTests(mockTestCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, [db]);

  const addEvent = async () => {
    const newEvent = prompt('Enter a national event:');
    if (newEvent) {
      await addDoc(collection(db, 'events'), { name: newEvent });
      setEvents([...events, { name: newEvent }]);
    }
  };

  const addTeacher = async () => {
    const teacherName = prompt('Enter teacher name:');
    if (teacherName) {
      await addDoc(collection(db, 'teachers'), { name: teacherName });
      setTeachers([...teachers, { name: teacherName }]);
    }
  };

  const scheduleMockTest = async () => {
    const date = prompt('Enter the mock test date (e.g., YYYY-MM-DD):');
    if (date) {
      await addDoc(collection(db, 'mockTests'), { date });
      setMockTests([...mockTests, { date }]);
      alert(`Mock test scheduled for ${date}`);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Total Teachers: {teachers.length}</p>
      <p>Total Students: {students.length}</p>
      
      <button onClick={addEvent} className="bg-blue-500 px-4 py-2 mt-4 rounded">Add Event</button>
      <button onClick={addTeacher} className="bg-green-500 px-4 py-2 mt-4 rounded ml-2">Add Teacher</button>
      <button onClick={scheduleMockTest} className="bg-yellow-500 px-4 py-2 mt-4 rounded ml-2">Schedule Mock Test</button>

      <h2 className="text-xl mt-6">Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="text-gray-400">{event.name}</li>
        ))}
      </ul>

      <h2 className="text-xl mt-6">Teachers</h2>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index} className="text-gray-400">{teacher.name}</li>
        ))}
      </ul>

      <h2 className="text-xl mt-6">Scheduled Mock Tests</h2>
      <ul>
        {mockTests.map((mockTest, index) => (
          <li key={index} className="text-gray-400">{mockTest.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;