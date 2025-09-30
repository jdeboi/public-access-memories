export default function SectionHeader(props: { title: string }) {
  return (
    <div className="mb-4 mt-8">
      <h3 className="uppercase font-[consoleFont]">{props.title}</h3>
      <div className="">---</div>
    </div>
  );
}
