import puppyImage from '../../assets/GettyImages-114998362_2BUY CMYK 2.png';

export function DefaultHero() {
  return (
    <div className="relative mx-auto inline-block pb-24">
      <div className="relative z-0 text-center text-main">
        <p className="text-[280px] font-bold leading-[230px]">I NEED</p>
        <p className="text-[280px] font-bold leading-[230px]">A NAME</p>
      </div>

      <img
        src={puppyImage}
        alt="Puppy waiting for a name"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto w-[300px] max-w-[32vw] -translate-x-1/2"
      />
    </div>
  );
}
