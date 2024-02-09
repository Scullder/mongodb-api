import { useState } from "react"

export default function ImageSlider({ slides, globKey }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectSlide = (index) => {
    setCurrentIndex(index);
  }

  return (
    <div className="">
      {/* <img src={slides[currentIndex]} className="w-auto h-full"/> */}
      <img src={slides[currentIndex]} className="max-h-[850px] mx-auto object-contain object-center"/>
      {slides.length > 1 && 
        <div className="grid grid-cols-5 gap-2 mt-2 p-4 rounded bg-tileDark items-center">
          {slides.map((slide, index) => {
            if (!slides[index]) {
              return
            }

            let imageClass = `object-fill object-center max-h-[150px] mx-auto hover:cursor-pointer ${index != currentIndex && 'grayscale'} hover:grayscale-0`
            return (
              <img src={slides[index]} onClick={() => selectSlide(index)} key={`${globKey}-${index}`} className={imageClass}/>
            )
          })}
        </div>
      }
    </div>
  )
}