import { useContext } from "react";
import FormContext from "../context/FormProvider";

export default function Cover() {
  const { showForm } = useContext(FormContext);

  return (
    <div
      className={`${
        showForm &&
        "fixed left-0 top-0 w-screen h-screen bg-slate-500 opacity-90 z-10"
      } md:absolute md:left-[-9999px]`}
    />
  );
}
