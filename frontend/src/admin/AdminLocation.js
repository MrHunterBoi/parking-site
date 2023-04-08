import {useContext} from "react";
import {dbContext} from "./AdminPage";

function AdminLocation() {
  const contextDb = useContext(dbContext);

  function handleChangeOption(e) {
    contextDb.setSelectedOption(e.target.value)
    if (contextDb.selectedSlot) document.getElementById(contextDb.selectedSlot).checked = false;
    contextDb.setSelectedSlot(undefined)
  }

  return (
    <div>
      <h2>Місцезнаходження стоянки</h2>
      <select defaultValue={contextDb.profileData.location} id={"street"} key={"street"} className={`form-select`} onChange={handleChangeOption} disabled={contextDb.profileData.perms !== 'superadmin'}>
        {contextDb.dbData.map((item, index) => {
            if (item.location === contextDb.profileData.location) contextDb.setSelectedOption(index)
            return <option value={index}
                    key={`${index}`}>{item.location}</option>
          }
        )}
      </select>
    </div>
  )
}

export default AdminLocation;