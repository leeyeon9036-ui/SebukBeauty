import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface HeroProps {
  onScrollToForm: () => void;
}

export default function Hero({ onScrollToForm }: HeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-primary/5 to-transparent">
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                성북구 대학생을 위한
                <br />
                <span className="text-primary">프리미엄 미용 서비스</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                편리한 온라인 예약과 학생 특화 혜택으로 합리적인 가격에 전문적인 스타일링을 경험하세요
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-semibold text-foreground">1000+ 학생들의 선택</span>
            </div>

            <Button 
              size="lg" 
              onClick={onScrollToForm}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full"
              data-testid="button-scroll-to-booking"
            >
              지금 예약하기
            </Button>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <div className="text-center space-y-4 p-12">
                <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-6xl">✂️</span>
                </div>
                <p className="text-xl font-semibold text-foreground">전문 스타일리스트</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
