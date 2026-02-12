export function BackgroundGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
    </div>
  );
}
