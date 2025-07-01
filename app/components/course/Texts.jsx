import React from 'react';

export default function Texts({ element, index }) {
    const style = {
        Ttulo1: <h1 key={index} className="mx-8 my-4 font-sans text-[30px]">{element.dato}</h1>,
        Ttulo2: <h2 key={index} className="mx-8 my-4 font-sans text-[25px]">{element.dato}</h2>,
        Ttulo3: <h3 key={index} className="mx-8 my-4 font-sans text-[20px]">{element.dato}</h3>,
        txt: <p key={index} className="mx-8 my-4 font-sans text-[15px]">{element.dato}</p>,
        l0: <ol key={index} className="list-disc mx-12 my-4 font-sans text-[15px]"><li><strong>{element.dato}</strong></li></ol>,
        l1: <ol key={index} className="list-disc mx-16 my-4 font-sans text-[15px]"><li>{element.dato}</li></ol>,
        l2: <ol key={index} className="list-disc mx-20 my-4 font-sans text-[15px]"><li>{element.dato}</li></ol>,
    };

    return (
        <>
            {style[element.id]}
        </>
    );
}

