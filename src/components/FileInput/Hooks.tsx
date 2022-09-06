import { ChangeEventHandler } from "react";

export const useHooks = () => {
  const handlefiles: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    console.log("file: ", file);
  };
  return { handlefiles };
};
