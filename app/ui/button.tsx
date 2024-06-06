'use client'

export function NavigationButton({
    className,
    content,
    onSubmit
  }: {
    className: string;
    content: string;
    onSubmit: Function;
  }) {
  
    return (
        <button onClick={()=>{
          onSubmit()
        }} className={`${className} font-semibold text-xl bg-blue-500 px-10 py-4 rounded-2xl text-white transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300`}>{content}</button>
    );
  }