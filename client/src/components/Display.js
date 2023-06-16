import { useState } from "react";
import "./Display.css"
const Display = ({ contract, account }) => {
    const [data, setData] = useState("");

    const getdata = async (e) => {
        e.preventDefault();
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;    // jo input aayega wo check kr rhe
        try {
            if (Otheraddress) {
                dataArray = await contract.display(Otheraddress);   // contract ka jo display wala function hai usko call kr rhe
                console.log(dataArray);
            } else {
                dataArray = await contract.display(account);
            }
        } catch (e) {
            alert("You don't have access");
        }
        const isEmpty = Object.keys(dataArray).length === 0;     // age uss address k pss koi data array hi nhi hai toh

        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            // console.log(str);
            // console.log(str_array);
            const images = str_array.map((item, i) => {
                return (
                    <a href={item} key={i} target="_blank">  {/*creating hyperlink of our images to get open in new tab with full view*/}
                        <img
                            key={i}
                            src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                            alt="new"
                            className="image-list"
                        ></img>
                    </a>
                );
            });
            setData(images);
        } else {
            alert("No image to display");
        }
    };
    return (
        <>
            <div className="image-list">{data}</div>    {/*we have our image information in data variable and now we are using that*/}     
            <input
                type="text"
                placeholder="Enter Address"
                className="address"                      // user input dega 
            ></input>
            <button className="center button" onClick={getdata}>    {/*jb bhi hm Get Data wale button ko click krenge to getdata wala function call hoga aur uss get getdata ka jo function hai jo hmse isi js file mein banaya hai wo hmare contract wale get function ko call krenga*/}
                Get Data                                              {/*onclick={getdata} mtlb jb bhi button pr click kro tb wo wala function call ho jaye*/}
            </button>
        </>
    );
};
export default Display;