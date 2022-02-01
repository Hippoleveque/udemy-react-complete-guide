import { useState } from "react";

const Greetings = () => {
  const [changed, setChanged] = useState(false);

  const handleClick = () => {
    setChanged(true);
  };

  return (
    <section>
      <h1> Hello World </h1>
      {!changed && <p> Original </p>}
      {changed && <p> Changed </p>}
      <button onClick={handleClick}> Change me !</button>
    </section>
  );
};

export default Greetings;