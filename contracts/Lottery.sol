
contract Lottery{
    address public manager;      //address of person who created contract
    address[] public players;    //dynamic array. do not want to restrict number of players

    function Lottery() public {
        manager = msg.sender;          //msg is global variable
    }

    function enter() public payable {
        require(msg.value > .01 ether);       //msg.value looks for amount of ether send in contract

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        //sha3();                            //sha3 is a global function
        return uint(keccak256(block.difficulty, now, players ));           //block  is global variable. now is current time global variable.
    }

    function pickWinner() public restricted{
        // require(msg.sender == manager);

        uint index = random() % players.length;
        players[index].transfer(this.balance);        //balance refers to amount of ether that exist in contract
        players = new address[](0);                   //will create new dynamic array of addresses initialized to length 0 (number mentioned in round bracket)
    }

   modifier restricted() {
       require(msg.sender == manager);
       _;
   }

   function getPlayers() public view returns (address[]){
       return players;
   }
}
