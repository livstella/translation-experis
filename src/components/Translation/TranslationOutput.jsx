import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import TranslationImageComponent from './TranslationImageComponent';
import { useEffect } from 'react';



const TranslationOutput = () => {
  
    //context for getting and setting the latest translation
    const {user, setUser} = useUser()
    let userInput = user.translations.slice(-1)[0].text

    const imageNames = []
    const [images, setImages] = useState(['one'])

    
    const translate = () => { 
    for (let letter of userInput){
        imageNames.push(`img/${letter}.png`) // make objects instead and add in an id because letters can de duplicates
    }
    console.log(imageNames)
    setImages(imageNames.map(imagePath => {
        return <img 
        src={imagePath}
        width='55'
        key={imagePath}/>
    }))
    console.log(images)
    }

    return <div>
        <button onClick={translate}>test</button>
      <h2>Your input in American sign language:</h2>
      
      {userInput}
      {images}
  </div>;
};

export default TranslationOutput;
