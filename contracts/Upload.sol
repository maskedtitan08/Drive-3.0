// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Upload{
    struct Access{                 // to store users to whom we are giving access
        address user;
        bool access;
    }

    mapping(address=>string[]) value;   //konsa user konsi immage store kr rha uska url
                                        // string array isliye kyunki each string each image ka url hoga
    mapping(address=>Access[]) accessList;    // jb hm share wala button use kr rhe the to jo list aa rhi thi ki hmne kiskisko access diya hai wo list
                                              // ek address ne kis kis address ko access de rkha hai
    mapping(address=>mapping(address=>bool)) ownership;  // same work as accesslist
    mapping(address=>mapping(address=>bool)) previousData;   // maanlo phle access diya phr hta diya pr phr jb dubara access dena hoga toh access list mein new entry na bane uske liye previous data ka use krenge

    function add(address _user,string memory _url) external{
        value[_user].push(_url);

    }
    function allow(address user) public{
        ownership[msg.sender][user]=true;        // msg.sender kisko access de rha hai
        if(previousData[msg.sender][user]==true){
            for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user==user){
                    accessList[msg.sender][i].access==true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(user,true)); 
            previousData[msg.sender][user]=true;      // logically it is stroing ki iss user ki entry blockchian pr phle ho chuki ki nahi kyunki blockchain se hta nhi skte uski entry sirf accress modify kr skte hain
        }   
    }
    function disallow(address user) public{
        ownership[msg.sender][user]=false;
        for(uint i=0;i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user==user){
                accessList[msg.sender][i].access=false;  // in blockchain we can only change the data but cannot delete the data
            }
        }
    }

    function display(address _user) external view returns(string[] memory ){
        require(_user==msg.sender || ownership[_user][msg.sender]==true);       // msg.sender khudki images dekhna chahta hai or msg.sender user ki images dekhna chahta hai
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory){     // used memory in returns because data is stored in blockchain
        return accessList[msg.sender];
    }




}