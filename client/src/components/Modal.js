import { useEffect } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;    // jo address input liya usi ko use kiya hai
    await contract.allow(address);
    setModalOpen(false);
  };
  const disAllowing = async () => {
    const address = document.querySelector(".address").value;    // jo address input liya usi ko use kiya hai
                                                                // (.address) => address is className of input tag
    await contract.disallow(address);
    setModalOpen(false);
  };
  
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();          // share access function of contract
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input type="text" className="address" placeholder="Enter Address"></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button onClick={() => {setModalOpen(false);}} id="cancelBtn">
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
            <button onClick={() => disAllowing()}>Revoke Access</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;