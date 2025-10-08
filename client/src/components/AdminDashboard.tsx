import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Clock, User, Phone, School, Mail, MapPin, DollarSign, Scissors, FileText, Image as ImageIcon, LogOut } from "lucide-react";

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

interface AdminDashboardProps {
  reservations: Reservation[];
  onLogout: () => void;
}

export default function AdminDashboard({ reservations, onLogout }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-card-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">예약 관리 시스템</h1>
          <Button 
            variant="outline" 
            onClick={onLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">예약 목록</h2>
          <p className="text-muted-foreground">총 {reservations.length}개의 예약</p>
        </div>

        <div className="space-y-6">
          {reservations.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">아직 접수된 예약이 없습니다.</p>
            </Card>
          ) : (
            reservations.map((reservation) => (
              <Card key={reservation.id} className="p-6" data-testid={`card-reservation-${reservation.id}`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {reservation.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        접수일시: {format(new Date(reservation.createdAt), "PPP p", { locale: ko })}
                      </p>
                    </div>
                    <Badge variant="secondary" data-testid={`badge-status-${reservation.id}`}>
                      접수 완료
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground text-sm">예약 정보</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{reservation.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{reservation.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <School className="w-4 h-4" />
                          <span>{reservation.school} ({reservation.studentId})</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{reservation.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground text-sm">요구 사항</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{reservation.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>{reservation.price}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Scissors className="w-4 h-4" />
                          <span>{reservation.treatment}</span>
                        </div>
                        {reservation.notes && (
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <FileText className="w-4 h-4 mt-0.5" />
                            <span className="flex-1">{reservation.notes}</span>
                          </div>
                        )}
                        {reservation.photoUrl && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <ImageIcon className="w-4 h-4" />
                            <a 
                              href={reservation.photoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              첨부 사진 보기
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
