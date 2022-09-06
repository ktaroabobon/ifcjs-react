import React from "react";
import { useHooks } from "./Hooks";

export const FileInput: React.FC = () => {
  const { handlefiles } = useHooks();
  return (
    <>
      <input
        type="file"
        accept="image/*"
        id={"fileInput"}
        onChange={handlefiles}
      />
    </>
  );
};
