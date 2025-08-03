import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="h-[calc(100vh-11rem)]">
      <div className="grid md:grid-cols-2 h-full overflow-hidden">
        {/* Columna izquierda */}
        <div className="hidden md:flex flex-col justify-center bg-secondary rounded-r">
          <div className="sm:pl-[3.5rem]">
            <h1 className="font-bold text-[min(10vw,3.75rem)]">
              Damos vida a tus ideas
            </h1> 
            <p className="text-[min(10vw,1rem)]">
              Contáctanos y construyamos juntos tu próximo proyecto
            </p>
            <Button className="w-fit mt-6">Escríbenos aquí para cotizar</Button>
          </div>
        </div>

        {/* Columna derecha de imágenes */}
        <div className="relative grid grid-cols-2 lg:grid-cols-3 gap-4 sm:px-4 overflow-hidden">
          <div className="absolute md:hidden z-50 flex flex-col justify-center w-full h-full px-8 bg-secondary/70">
            <h1 className="font-bold text-4xl">Damos vida a tus ideas</h1>
            <p className="">
              Contáctanos y construyamos juntos tu próximo proyecto
            </p>
            <Button className="w-fit mt-6" size={"lg"}>
              <span>Escríbenos aquí para cotizar</span>
            </Button>
          </div>
          {/* Columna 1 - scroll hacia arriba */}
          <div className="overflow-hidden h-full group">
            <div className="grid gap-4 [animation:var(--animate-vertical-loop)] group-hover:[animation-play-state:paused]">
              {[1, 2].map((_, i) => (
                <React.Fragment key={i}>
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-1`}
                    width={232}
                    height={300}
                  />
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-2`}
                    width={232}
                    height={300}
                  />
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-3`}
                    width={232}
                    height={300}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Columna 2 - scroll hacia abajo */}
          <div className="overflow-hidden h-full group">
            <div className="grid gap-4 [animation:var(--animate-vertical-loop-reverse)] group-hover:[animation-play-state:paused]">
              {[1, 2].map((_, i) => (
                <React.Fragment key={i}>
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-4`}
                    width={232}
                    height={300}
                  />
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-5`}
                    width={232}
                    height={300}
                  />
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-6`}
                    width={232}
                    height={300}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Columna 3 - igual a la 1, scroll hacia arriba */}
          <div className="hidden sm:block overflow-hidden h-full group">
            <div className="grid gap-4 [animation:var(--animate-vertical-loop)] group-hover:[animation-play-state:paused]">
              {[1, 2].map((_, i) => (
                <React.Fragment key={i}>
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-7`}
                    width={232}
                    height={300}
                  />
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-8`}
                    width={232}
                    height={300}
                  />
                  <Image
                    className="w-full rounded shadow"
                    src="https://placehold.co/232x300.png"
                    alt={`img-${i}-9`}
                    width={232}
                    height={300}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
