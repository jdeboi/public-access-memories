import { Link } from "react-router-dom";

export default function WindowsHeaderBox({
  title,
  className,
  thumbnail,
  link,
  children,
}: {
  title: string;
  className?: string;
  subtitle?: string;
  thumbnail?: string;
  link?: string;
  children?: React.ReactNode;
}) {
  const ThumbNailImg = () => {
    return (
      <div className="w-[250px] h-[250px] overflow-hidden">
        <img
          src={thumbnail ?? ""}
          alt={title}
          loading="lazy"
          className="block w-full h-full object-cover" // fills the box, no stretching
          sizes="250px"
        />
      </div>
    );
  };

  return (
    <div
      className={`windows transition-shadow hover:shadow-lg mb-6 ${className}`}
    >
      <div className="flex gap-5 p-5 items-start  bg-slate-900/20  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
        {/* LEFT: Thumbnail */}
        {thumbnail && (
          <div className="shrink-0 w-[250px] min-w-[250px]">
            {link ? (
              <Link to={link}>
                <Thumbnail src={thumbnail} alt={title} />
              </Link>
            ) : (
              <Thumbnail src={thumbnail} alt={title} />
            )}
          </div>
        )}

        {/* RIGHT: Body (flexes to fill) */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function Thumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-[250px] h-[250px] overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full h-full object-cover"
        sizes="250px"
        draggable={false}
      />
    </div>
  );
}
