import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
// Served from the repo (public/videos) so the MP4 ships with any deployment target.
const VIDEO_SRC = "/videos/csi-super-toophan-brand-video.mp4";
const POSTER_SRC = "/videos/csi-super-toophan-brand-video-poster.jpg";

export function BrandVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  };

  return (
    <section aria-labelledby="brand-video-heading" className="mb-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0d6b78]">
          Brand Film
        </p>
        <h2
          id="brand-video-heading"
          className="mt-2 font-[Poppins] text-3xl font-bold tracking-tight text-[#0a2f44] sm:text-4xl"
        >
          Discover CSI Super Toophan
        </h2>
        <p className="mt-3 font-[Inter] text-base text-slate-600">
          A short look at the craftsmanship, quality and innovation behind every CSI Super Toophan
          product.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl">
        <div className="group relative overflow-hidden rounded-3xl bg-white/70 shadow-md ring-1 ring-white/60 backdrop-blur-xl">
          <video
            ref={videoRef}
            className="aspect-video h-full w-full bg-slate-900 object-cover"
            src={videoAsset.url}
            poster={posterAsset.url}
            muted
            playsInline
            loop
            preload="none"
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="CSI Super Toophan brand advertisement video"
          />
          {!playing ? (
            <button
              type="button"
              onClick={toggle}
              aria-label="Play brand video"
              className="absolute inset-0 flex items-center justify-center bg-[#0a2f44]/30 transition-colors hover:bg-[#0a2f44]/40"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                <Play className="ml-1 h-7 w-7 text-[#0d4361]" />
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={toggle}
              aria-label="Pause brand video"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-md transition-transform hover:scale-105"
            >
              <Pause className="h-4 w-4 text-[#0d4361]" />
            </button>
          )}
        </div>
        <p className="mt-3 text-center font-[Inter] text-xs text-slate-500">
          Video plays muted. Use the controls to play, pause or unmute.
        </p>
      </div>
    </section>
  );
}
