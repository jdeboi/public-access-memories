export default function SectionHeader({
  title,
  colorClass,
  className = "mb-4",
}: {
  title: string;
  colorClass?: string;
  className?: string;
}) {
  return (
    <div className={`mt-8 ${colorClass || "text-white"} ${className}`}>
      <div className="uppercase font-[manoloFont] text-2xl">{title}</div>
      <div className="">---</div>
    </div>
  );
}
