import { useLocation } from "wouter";
import AdminLogin from "@/components/AdminLogin";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toast({
          title: "로그인 성공",
          description: "관리자 페이지로 이동합니다.",
        });
        setLocation('/admin/dashboard');
      } else {
        toast({
          title: "로그인 실패",
          description: "아이디 또는 비밀번호를 확인해주세요.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  return <AdminLogin onLogin={handleLogin} />;
}
