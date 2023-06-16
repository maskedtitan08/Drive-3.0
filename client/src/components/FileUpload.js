// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// const FileUpload = ({ contract, account, provider }) => {
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState("No image is selected");

//     const handleSubmit = async (e) => {
//         e.preventDefault(); //used to prevent our data from reload
//         if (file) {
//             try {
//                 const formData = new FormData();
//                 formData.append("file", file);

//                 const resFile = await axios({
//                     method: "post",
//                     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//                     data: formData,
//                     headers: {
//                         pinata_api_key: `58fef1cec40a868f2923`,
//                         pinata_secret_api_key: `f25e4d162f382003759b59337a591950692123e44d9b5577546d30ad165aade0`,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });
//                 const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;               //fetching hash of images these all syntaxes are from ipfs documentation
//                 contract.add(account, ImgHash); //add function of smart contract*/ /*contract is instance of our contract
//                 alert("Successfully Image Uploaded");   //alert use krte wo jo top pr msg type ka aata hai na succedfull type wala uske liye
//                 setFileName("No image selected");       // ek br upload ho gyi uske bd dubara initial state mein laane k liye filename or file ko initial ki trh set kiya
//                 setFile(null);
//             } catch (e) {
//                 alert("Unable to upload image to Pinata");
//             }
//         }
//         // alert("Successfully Image Uploaded");
//         // setFileName("No image selected");
//         // setFile(null); 
//     };
//     const retrieveFile = (e) => {
//         const data = e.target.files[0]; //files array of files object // converting image to useful which can be stored 
//         console.log(data);
//         const reader = new window.FileReader();
//         reader.readAsArrayBuffer(data);
//         reader.onloadend = () => {
//             setFile(e.target.files[0]);      // read krne k bd uss file ko apne file wale varibale mein save kr liya
//         };
//         setFileName(e.target.files[0].name);
//         e.preventDefault();
//     };
//     return (
//         <div className="top">
//             <form className="form" onSubmit={handleSubmit}>
//                 <label htmlFor="file-upload" className="choose">
//                     Choose Image to Upload
//                 </label>
//                 <input
//                     disabled={!account}
//                     type="file" id="file-upload"
//                     name="data"
//                     onChange={retrieveFile}
//                 />
//                 <span className="textArea">Image: {fileName}</span>
//                 <button type="submit" className="upload" disabled={!file}>
//                     Upload File
//                 </button>
//             </form>
//         </div>
//     );
// };
// export default FileUpload;



import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `1b85ebd07e04db8aba52`,
            pinata_secret_api_key: `614dbbf8a99b80fb594cccc0313abd184c1d2db1e379a18f5f745e97e9cd66b6`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account,ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    // alert("Successfully Image Uploaded");
    // setFileName("No image selected");
    // setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;

