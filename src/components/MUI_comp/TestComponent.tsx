import React, { useState } from 'react';
import Settings from './Settings';

const TestComponent = () => {
  const [name, setName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(name);
  };
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="super">
      {/* <TextFieldCustom
        label="Name"
        error={false} //If the error is true it will highlight the input field in red
        width="500px" //Set the Input field width
        mainColor="black" // ==> Border color of the input
        secondaryColor="white" // ==> color of the background
        textColor="black"
        // (We can style this more manually or by putting more
        // props this is just for demo purposes if u want to try change the colors in the
        // root component called "TextFieldCustom.tsx")
        onChange={handleChange} // Function to asign values
        required // makes it required xd
      />
      <ButtonComponent
        onClick={handleClick}
        variant="contained"
        customColor="orange"
        width="20rem"
        height="2rem"
      >
        Clickme
      </ButtonComponent>
      {/*(We can style this more manually or by putting more
        props this is just for demo purposes if u want to try change the colors in the
        root component called "TextFieldCustom.tsx") */}
        {/* <NestedList/> */} 
      {/* <SettingColors /> */}
        <Settings/>
    </div>
  );
};

export default TestComponent;
