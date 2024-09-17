import React, { useEffect, useState } from "react";

const Image_Slider = () => {
  const imagesArr = [
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80",
    "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
  ];
  const [index, setIndex] = useState(0);

  return (
    <div className="flex justify-between items-center px-32">
      <button
        className="hover:scale-110 duration-150 "
        onClick={() => {
          index > 0 ? setIndex(index - 1) : setIndex(imagesArr.length - 1);
        }}
      >
        Left
      </button>

      <div>
        <img src={imagesArr[index]} width="800" className="h-96" />
        <label className="text-center flex justify-center">
          {index + 1} of {imagesArr.length}
        </label>
      </div>

      <button
        className="hover:scale-110 duration-150 "
        onClick={() => {
          index < imagesArr.length - 1 ? setIndex(index + 1) : setIndex(0);
        }}
      >
        Right
      </button>
    </div>
  );
};

export default Image_Slider;
