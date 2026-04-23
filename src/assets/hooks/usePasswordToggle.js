import { useState } from "react";

export const usePasswordToggle = () => {
  const [show, setShow] = useState(false);

  return {
    show,
    toggle: () => setShow((prev) => !prev),
  };
};
