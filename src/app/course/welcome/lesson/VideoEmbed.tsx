"use client";
export default function VideoEmbed({ youtubeId }: { youtubeId: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border bg-black/5 shadow-sm">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
