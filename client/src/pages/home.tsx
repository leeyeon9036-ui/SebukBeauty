import { useRef } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BookingForm from "@/components/BookingForm";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookingSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "예약이 접수되었습니다!",
          description: "빠른 시일 내에 연락드리겠습니다.",
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('예약 접수 실패');
      }
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollToForm={scrollToForm} />
      <Features />
      <div ref={formRef}>
        <BookingForm onSubmit={handleBookingSubmit} />
      </div>
      
      <footer className="bg-card border-t border-card-border py-8 mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 성북구 대학생 미용실 예약 서비스. All rights reserved.
            </p>
            <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-admin">
              관리자 로그인
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
