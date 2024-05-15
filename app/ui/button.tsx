'use client'

export function NavigationButton({
    content,
    onSubmit
  }: {
    content: string;
    onSubmit: Function;
  }) {
  
    return (
        <button onClick={()=>{
          onSubmit()
        }} className="absolute bottom-52 left-60 font-semibold text-3xl bg-blue-500 px-10 py-4 rounded-2xl text-white transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300">{content}</button>
    );
  }