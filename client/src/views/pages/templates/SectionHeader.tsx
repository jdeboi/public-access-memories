export default function SectionHeader(props: { title: string }) {
  return (
    <div className="mb-4 mt-8 text-white">
      <div className="uppercase font-[manoloFont] text-2xl">{props.title}</div>
      <div className="">---</div>
    </div>
  );
}
