import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
  images,
  initial = 0,
  onClose,
}: {
  images: string[];
  initial?: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(initial);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setI((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close gallery"
        className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
      >
        <X className="h-5 w-5" />
      </button>
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setI((p) => (p - 1 + images.length) % images.length); }}
            aria-label="Previous image"
            className="absolute left-4 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setI((p) => (p + 1) % images.length); }}
            aria-label="Next image"
            className="absolute right-4 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <img
        src={images[i]}
        alt={`Fan image ${i + 1} of ${images.length}`}
        className="max-h-[88vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {images.length > 1 && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 text-white px-3 py-1 text-xs font-[Inter]">
          {i + 1} / {images.length}
        </span>
      )}
    </div>
  );
}
