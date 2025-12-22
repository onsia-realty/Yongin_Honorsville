'use client';

interface ShareButtonsProps {
  title: string;
  excerpt: string;
}

export default function ShareButtons({ title, excerpt }: ShareButtonsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.href,
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleShare}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        공유하기
      </button>
      <button
        onClick={handleCopyLink}
        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
      >
        링크 복사
      </button>
    </div>
  );
}
