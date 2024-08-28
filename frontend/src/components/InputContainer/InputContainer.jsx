export default function InputContainer({ label, bgColor, children }) {
  return (
    <div
      className=" mb-[0.5rem] rounded-[0.7rem] border border-[#e0e0e0] pt-[0.3rem]"
      style={{ backgroundColor: bgColor }}
    >
      <label className="inline-block ml-[0.5rem] text-[#5f5f5f] text-[1rem]">
        {label}
      </label>
      <div className="px-[0.5rem] h-[2.7rem] flex items-center">
        {children}
      </div>
    </div>
  );
}
