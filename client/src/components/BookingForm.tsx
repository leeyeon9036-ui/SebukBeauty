// src/components/BookingForm.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Upload } from "lucide-react";

const SEONGBUK_DISTRICTS = [
  "정릉동", "길음동", "성북동", "돈암동", "안암동",
  "보문동", "종암동", "월곡동", "장위동", "석관동"
];

const PRICE_RANGES = [
  "1만원 미만", "1만원 - 2만원", "2만원 - 3만원",
  "3만원 - 5만원", "5만원 이상"
];

// 10:00 ~ 20:00 (30분 단위)
const TIME_SLOTS = Array.from({ length: 21 }, (_, i) => {
  const hour = Math.floor(10 + i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

// 깃헙 페이지(정적) → Render(API) 호출용 절대 경로
const API_BASE = "https://sebukbeauty.onrender.com";

async function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

interface BookingFormProps {
  // 부모에서 필요하면 성공 시 데이터 확인용으로 쓸 수 있게, 선택 props로 둠
  onSubmit?: (data: any) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 서버 스키마에 맞춘 페이로드(★ 가장 중요)
    const payload: any = {
      date:       date ? format(date, "yyyy-MM-dd") : "",
      timeslot:   time,            // time → timeslot
      name,
      phone,
      school,
      student_id: studentId,       // studentId → student_id
      email,
      location,
      price_range: price,          // price → price_range
      style:       treatment,      // treatment → style
      etc:         notes,          // notes → etc
    };

    if (!payload.date || !payload.timeslot || !payload.name || !payload.phone) {
      alert("날짜/시간/이름/전화는 필수입니다.");
      return;
    }

    if (photo) {
      try {
        payload.photo_base64 = await toBase64(photo);
      } catch {
        alert("사진 인코딩 중 오류가 발생했습니다.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const out = await res.json().catch(() => ({}));
      if (res.ok && out?.ok) {
        alert("예약이 완료되었습니다!");
        onSubmit?.(payload); // 선택: 부모에서 후처리 원하면 사용
        // 폼 초기화
        setDate(undefined);
        setTime("");
        setName("");
        setPhone("");
        setSchool("");
        setStudentId("");
        setEmail("");
        setLocation("");
        setPrice("");
        setTreatment("");
        setNotes("");
        setPhoto(null);
      } else {
        alert(out?.message || `예약 실패 (status ${res.status})`);
        console.error("Create reservation failed:", res.status, out);
      }
    } catch (err) {
      console.error(err);
      alert("네트워크/서버 통신 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-muted/30" id="booking-form">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            미용실 예약 신청
          </h2>
          <p className="text-muted-foreground">
            원하시는 정보를 입력하시면 맞춤 미용실을 추천해드립니다
          </p>
        </div>

        <Card className="p-8 md:p-12">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">예약 정보</h3>

                <div className="space-y-2">
                  <Label htmlFor="date">날짜 *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        data-testid="button-date-picker"
                        type="button"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ko }) : "날짜를 선택하세요"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ko}
                        data-testid="calendar-date"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">시간 *</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger data-testid="select-time">
                      <SelectValue placeholder="시간을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    required
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호 *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    required
                    data-testid="input-phone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">학교 *</Label>
                  <Input
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="학교명을 입력하세요"
                    required
                    data-testid="input-school"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">학번 *</Label>
                  <Input
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="학번을 입력하세요"
                    required
                    data-testid="input-student-id"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">요구 사항</h3>

                <div className="space-y-2">
                  <Label htmlFor="location">위치 *</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger data-testid="select-location">
                      <SelectValue placeholder="성북구 동을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEONGBUK_DISTRICTS.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">가격 *</Label>
                  <Select value={price} onValueChange={setPrice}>
                    <SelectTrigger data-testid="select-price">
                      <SelectValue placeholder="가격대를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRICE_RANGES.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatment">희망 시술 *</Label>
                  <Input
                    id="treatment"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    placeholder="예: 커트, 펌, 염색 등"
                    required
                    data-testid="input-treatment"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">기타 요구사항</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="추가 요청사항이 있으면 입력해주세요 (선택사항)"
                    rows={4}
                    data-testid="textarea-notes"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">사진 업로드</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover-elevate transition-colors">
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                      className="hidden"
                      data-testid="input-photo"
                    />
                    <label htmlFor="photo" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {photo ? photo.name : "원하는 스타일 사진을 업로드하세요 (선택사항)"}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                data-testid="button-submit"
                disabled={submitting}
              >
                {submitting ? "전송 중..." : "예약 신청하기"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
