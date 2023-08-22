"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

const User=()=>{
    return (
        <div className="text-black flex flex-row w-full">
            <div className="flex flex-row gap-12">
                <p>1</p>
                <p>Sam</p>
                <p>2 out of 3</p>
                <p>Awaiting Confirmation</p>
            </div>
        </div>
    )
}

const TransQueue = () => {
  return (
    <div>
        <Accordion variant="splitted" selectionMode="multiple"  >
            {[1,2,3].map((i)=>(
                <AccordionItem key={i} aria-label={`name${i}`} startContent={
                    <User/>
                }>
                    <div className="">
                        <p>hello every one may create here also</p>
                    </div>

                </AccordionItem>
            ))}
        </Accordion>
    </div>
  )
}

export default TransQueue  