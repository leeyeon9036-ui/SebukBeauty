import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import AdminDashboard from "@/components/AdminDashboard";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: number;
  date: string;
  time: string;
  name: string;
  phone: string;
  school: string;
  studentId: string;
  email: string;
  location: string;
  price: string;
  treatment: string;
  notes?: string;
  photoUrl?: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: reservations = [], isLoading } = useQuery<Reservation[]>({
    queryKey: ['/api/reservations'],
  });

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast({
        title: "로그아웃되었습니다",
      });
      setLocation('/');
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  return <AdminDashboard reservations={reservations} onLogout={handleLogout} />;
}
