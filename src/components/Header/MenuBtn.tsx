export default function MenuBtn() {
  return (
    <button className="h-7">
      <div className="flex h-full max-h-5 w-8 flex-col justify-between duration-75 hover:max-h-7">
        <div className="h-[0.125rem] bg-white"></div>
        <div className="h-[0.125rem] bg-white"></div>
        <div className="h-[0.125rem] bg-white"></div>
      </div>
    </button>
  );
}
