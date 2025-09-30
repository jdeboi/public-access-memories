export default function SectionHeader(props: { title: string }) {
  return (
    <div className="mb-4 mt-8 text-white">
      <h3 className="uppercase font-[consoleFont]">{props.title}</h3>
      <div className="mt-[-8px]">---</div>
    </div>
  );
}
