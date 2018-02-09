pragma solidity ^0.4.18;

contract EventRegistration {
    struct Registrant {
        uint amount;
        uint numTickets;
        string email;
        address registrantAddr;
    }

    address public owner;
    uint public numTicketsSold;
    uint public quota;
    uint public price;
    uint public numRegistrants;
    bool public canceled;
    
    mapping(address => uint) registrantIndex;
    mapping(uint => Registrant) registrantDetails;

    event Deposit(address _from, uint amount);
    event Refund(address _to, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier soldOut() {
        require(numTicketsSold < quota);
        _;
    }

    function EventRegistration (uint _quota, uint _price) public {
        owner = msg.sender;
        numTicketsSold = 0;
        quota = _quota;
        price = _price;
    }

    function buyTicket(string email, uint numTicketsToBuy) soldOut public payable {
        uint totalAmount = price * numTicketsToBuy;
        require(msg.value >= totalAmount);
        numTicketsSold += numTicketsToBuy;

        uint index = 0;
        if (registrantIndex[msg.sender] != 0) {
            index = registrantIndex[msg.sender];
            registrantDetails[index].amount += totalAmount;
            registrantDetails[index].numTickets += numTicketsToBuy;
        } else {
            index = ++numRegistrants;
            registrantIndex[msg.sender] = index;
            registrantDetails[index].amount = totalAmount;
            registrantDetails[index].numTickets = numTicketsToBuy;
            registrantDetails[index].email = email;
            registrantDetails[index].registrantAddr = msg.sender;
        }

        if (msg.value > totalAmount) {
            uint refundAmount = msg.value - totalAmount;
            require(msg.sender.send(refundAmount));
        }
        Deposit(msg.sender, msg.value);
    }
}