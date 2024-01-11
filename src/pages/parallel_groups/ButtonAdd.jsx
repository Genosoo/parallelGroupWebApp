/* eslint-disable no-unused-vars */
import { BsPersonPlus } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
export default function ButtonAdd({handleOpenFormAdd}) {
  return (
    <button className="btn_add_pl" onClick={handleOpenFormAdd}>
          <BsPersonPlus/>Add Parallel Group</button>
          
  )
}
