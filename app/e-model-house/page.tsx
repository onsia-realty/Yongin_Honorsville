import Link from "next/link"
import { Phone, MapPin, MessageCircle } from "lucide-react"

export default function EModelHouse() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-[#1a237e] to-[#512da8] flex items-center justify-center">
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">e모델하우스</h1>
          <p className="text-xl">클러스터용인 경남아너스빌을 미리 체험해보세요</p>
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <iframe 
              allowFullScreen
              frameBorder="0" 
              src="https://cluster-honorsville.co.kr/vtour/tour.html"
              style={{ marginTop: '1em', width: '100%', height: '80vh' }}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">더 자세한 정보가 필요하신가요?</h2>
          <p className="text-xl mb-8 opacity-90">전문 상담원이 친절하게 안내해드립니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:1668-5257" 
              className="inline-flex items-center justify-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              전화 상담하기
            </a>
            <Link 
              href="/directions" 
              className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-bold transition-all"
            >
              <MapPin className="w-5 h-5 mr-2" />
              오시는길 안내
            </Link>
            <a 
              href="https://open.kakao.com/o/sen4dWJh" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-bold transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              카카오톡 문의
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}