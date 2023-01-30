import { useEffect, useState } from "react";
import SectionLabel from "../../General/Text/SectionLabel";
import Display from "../../General/Text/Display";
import Copy from "../../General/Text/Copy";
import clsx from "clsx";
import ScreenModal from "../../Layout/ScreenModal";
import Form from "./Form";
import { createPortal } from "react-dom";

export default function Button() {
  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setBody(document.body);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-max md:min-w-[13rem]"
        )}
      >
        Form Test
      </button>
      {body &&
        createPortal(
          <ScreenModal {...{ isOpen, setIsOpen }}>
            <div className="flex w-full items-center bg-white">
              <div className="mx-auto w-full max-w-[min(82%,37rem)]">
                <div className="w-full">
                  <div>
                    <SectionLabel padding="hero-md">
                      Early bird offers
                    </SectionLabel>
                    <Display className="max-w-[34rem] pb-6">
                      Register with us for property alerts
                    </Display>
                    <Copy className="max-w-md" size="md">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut.
                    </Copy>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-primary-200">
              <div className="flex h-full w-full items-center justify-center">
                <Form />
              </div>
            </div>
          </ScreenModal>,
          body
        )}
    </>
  );
}
