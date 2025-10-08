import { Card } from "@/components/ui/card";
import { DollarSign, MapPin, Scissors } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: DollarSign,
      title: "학생 특화 가격",
      description: "대학생을 위한 합리적인 가격으로 부담없이 이용하세요"
    },
    {
      icon: MapPin,
      title: "편리한 위치",
      description: "성북구 전역의 미용실을 한 곳에서 예약하세요"
    },
    {
      icon: Scissors,
      title: "전문 스타일리스트",
      description: "경험 많은 전문가들이 트렌디한 스타일을 제안합니다"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-8 hover-elevate transition-all duration-300"
                data-testid={`card-feature-${index}`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
