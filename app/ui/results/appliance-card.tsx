'use client'

export function ApplianceCard({
    title,
  }: {
    title: string;
  }) {
  
    return (
      <div className="inline-block pr-4 pb-6">
        <button 
          className='bg-white border px-3 py-2 text-sm rounded-lg'
          disabled={true}
        >
          {title}
        </button>
      </div>
    );
  }