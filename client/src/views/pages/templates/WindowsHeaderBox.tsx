import { Link } from "react-router-dom";

export default function WindowsHeaderBox({
  title,
  className,
  thumbnail,
  link,
  isBlack = false,
  children,
}: {
  title: string;
  className?: string;
  thumbnail?: string;
  link?: string;
  isBlack?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`${
        isBlack ? "windowsBlack" : "windows"
      } transition-shadow hover:shadow-lg mb-6 ${className || ""}`}
    >
      {/* 1 col on xs/sm → 2 cols at md+ */}
      <div className="grid gap-5 p-5 items-start bg-slate-900/20 sm:grid-cols-[250px_1fr]">
        {/* Thumbnail (stacks on top on small, fixed column at md+) */}
        {/* why isn't small working when deployed? */}
        {thumbnail && (
          <div className="w-full sm:w-[250px] sm:min-w-[250px]">
            {link ? (
              <Link to={link} className="block">
                <Thumbnail src={thumbnail} alt={title} />
              </Link>
            ) : (
              <Thumbnail src={thumbnail} alt={title} />
            )}
          </div>
        )}

        {/* Body */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

function Thumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full sm:w-[250px] sm:h-[250px] aspect-square overflow-hidden rounded">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover block"
        sizes="(min-width: 768px) 250px, 100vw"
        draggable={false}
      />
    </div>
  );
}
