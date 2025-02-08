import { useState, useEffect } from 'react';
import Navbar from '../components/navBar';
import { collection, getDocs } from 'firebase/firestore';

function StudentDashboard({ db }) {
  const [assignments, setAssignments] = useState([]);
  const [mockTests, setMockTests] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const assignmentCollection = await getDocs(collection(db, 'assignments'));
      const mockTestCollection = await getDocs(collection(db, 'mockTests'));
      const eventCollection = await getDocs(collection(db, 'events'));

      setAssignments(assignmentCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setMockTests(mockTestCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setEvents(eventCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, [db]);

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <h2 className="text-xl mt-6">Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id} className="text-gray-400">{assignment.details}</li>
        ))}
      </ul>

      <h2 className="text-xl mt-6">Mock Test Dates</h2>
      <ul>
        {mockTests.map((mockTest) => (
          <li key={mockTest.id} className="text-gray-400">{mockTest.date}</li>
        ))}
      </ul>

      <h2 className="text-xl mt-6">Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="text-gray-400">{event.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;