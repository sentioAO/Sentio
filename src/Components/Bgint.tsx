import React from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { cn } from '../../src/lib/utils';

const Bgint = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget) return;
        const { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return (
        <div>
            <div
                className={cn(
                    "relative min-h-screen h-full flex flex-col items-center justify-center app-background w-full",
                )}
                onMouseMove={handleMouseMove}
            >
                <div className="absolute inset-0 app-background pointer-events-none opacity-50" />
                <motion.div
                    className="pointer-events-none bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                200px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%
              )
            `,
                        maskImage: useMotionTemplate`
              radial-gradient(
                200px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%
              )
            `,
                    }}
                />
            </div>
        </div>
    )
}

export default Bgint
