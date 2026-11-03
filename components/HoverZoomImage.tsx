type HoverZoomImageProps = {
  src: string;
  alt: string;
  imageClassName?: string;
  frameClassName?: string;
  loading?: "lazy" | "eager";
};

export default function HoverZoomImage({
  src,
  alt,
  imageClassName = "max-h-full max-w-full object-contain",
  frameClassName = "",
  loading = "lazy",
}: HoverZoomImageProps) {
  return (
    <span className={`hover-zoom-frame relative flex h-full w-full items-center justify-center ${frameClassName}`}>
      <img src={src} alt={alt} loading={loading} className={imageClassName} />
      <span className="hover-zoom-preview" aria-hidden="true">
        <img src={src} alt="" className="max-h-[94vh] max-w-[96vw] object-contain" />
      </span>
    </span>
  );
}
