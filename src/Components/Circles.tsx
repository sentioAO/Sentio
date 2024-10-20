import OrbitingCircles from "./ui/orbiting-circles"
import Ao from "../assets/AO2.png"
export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full  flex-col items-center justify-center overflow-hidden rounded-lg border bg-black md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        Sentinel
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Icons.AO1 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={60}
        delay={30}
        radius={150}
      >
        <Icons.AO1 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={50}
        radius={80}
      >
        <Icons.AO1/>
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        reverse
      >
        <Icons.AO1 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={50}
        delay={20}
        reverse
      >
        <Icons.AO1 />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  AO1: () => (
    <img src={Ao} alt="" />
  ),
  
};
