import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLatestTranslation } from '../../context/LatestTranslationContext';



const TranslationOutput = () => {
  
    //context for getting and setting the latest translation
    const {latestTranslation} = useLatestTranslation()

    //state for showing sing language images
    const [images, setImages] = useState([null])
    
    //list of images to display as a translation
    const imageObjects = []

    const translate = () => { 
    for (let index = 0; index < latestTranslation.length; index++){
        let letter = latestTranslation[index]
        imageObjects.push({image: `img/${letter}.png`,
        id: index}) 
    }
    setImages(imageObjects.map(imageObject => {
        return <img
        src={imageObject.image}
        width='55'
        key={imageObject.id}
        />
    }))
    }

    return <div>
        <button onClick={translate}>TEST TRANSLATE IN OUTPUT COMP</button>
      <h2>Your text in American sign language:</h2>
      {images}
  </div>;
};

export default TranslationOutput;
