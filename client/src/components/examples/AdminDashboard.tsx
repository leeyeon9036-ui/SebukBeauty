import AdminDashboard from '../AdminDashboard';

export default function AdminDashboardExample() {
  const mockReservations = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:00",
      name: "김민수",
      phone: "010-1234-5678",
      school: "한국대학교",
      studentId: "2021001234",
      email: "minsu@example.com",
      location: "안암동",
      price: "2만원 - 3만원",
      treatment: "커트",
      notes: "앞머리를 짧게 잘라주세요",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      date: "2024-01-16",
      time: "15:30",
      name: "이지영",
      phone: "010-9876-5432",
      school: "서울대학교",
      studentId: "2020005678",
      email: "jiyoung@example.com",
      location: "성북동",
      price: "3만원 - 5만원",
      treatment: "염색",
      photoUrl: "#",
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <AdminDashboard 
      reservations={mockReservations}
      onLogout={() => console.log('Logout clicked')}
    />
  );
}
