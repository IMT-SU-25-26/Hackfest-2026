import Image from 'next/image'

function RecapSection() {
  return (
    <div className="bg-[#0a0a1f]" >
      <Image
        className='w-[70%] m-auto'
        src="/recap/blockBG.svg"
        alt="Recap Section"
        height={500}
        width={500}
      />

      <div className="relative w-full h-[500px] overflow-hidden">
        <Image
          src="/recap/backgroundContainer.svg"
          alt="Recap Background"
          fill
          className="object-cover -z-10"
        />
        {/* Foreground content */}
        <h1 className="text-white text-3xl text-center pt-20 relative z-10">Recap Section</h1>
      </div>
    </div>
  )
}

export default RecapSection