pragma solidity 0.8.1;

contract Doscars {
    struct Movie {
        uint votes;
        address payable enlister;
        string posterPath; // url for the poster of this movie
    }
    
    modifier enlisting(){
        require(keccak256(bytes(state)) == keccak256(bytes("enlisting")), "This action can only be performed when at the enlisting stage.");
        _;
    }
    
    modifier voting(){
        require(keccak256(bytes(state)) == keccak256(bytes("voting")), "This action can only be performed when at the voting stage.");
        _;
    }
    
    modifier onlyOwner(){
        require(address(msg.sender) == owner);
        _;
    }
    
    modifier wfw(){
        require(keccak256(bytes(state)) == keccak256(bytes("wfw")), "This action can only be performed when the voting's over.");
        _;
    }
    
    event MovieEnlisted(uint movieID, address enlister);
    event EnlistingOver();
    event Vote(uint movieID, address voter);
    event VotingOver();
    event WinnerDeclared(uint movieID);
    
    string public state = "enlisting"; // enlisting / voting / wfw(waiting for winner) / over
    mapping (uint => Movie) public movies;
    uint[] moviesArray;
    address payable private owner;
    int public winner;
    
    constructor(){
        owner = payable(msg.sender);
        winner = -1;
    }
    
    function enlistMovie(uint movieID, string memory posterPath) public payable enlisting{
        require(msg.value >= 0.1 ether, "Unsufficient amount.");
        require(movies[movieID].enlister == address(0), "This movie has already been enlisted");
        Movie memory newMovie = Movie(0, payable(msg.sender), posterPath);
        movies[movieID] = newMovie;
        moviesArray.push(movieID);
        uint rest = msg.value - 0.1 ether;
        if(rest > 0){
            payable(msg.sender).transfer(rest);
        }
        emit MovieEnlisted(movieID, msg.sender);
    }
    
    function voteForMovie(uint movieID) public payable voting{
        require(msg.value >= 0.1 ether, "Unsufficient amount.");
        require(movies[movieID].enlister != address(0), "This movie has not been enlisted");
        movies[movieID].votes += 1;
        uint rest = msg.value - 0.1 ether;
        if(rest > 0){
            payable(msg.sender).transfer(rest);
        }
        emit Vote(movieID, msg.sender);
    }
    
    function getMovies() public view returns (uint[] memory)   {
        return moviesArray;
    }
    
    function finishEnlisting() public onlyOwner enlisting {
        state = "voting";
        emit EnlistingOver();
    }
    
    function declareWinner() public onlyOwner wfw{
        uint currentWinner = 0;
        for(uint i = 1; i < moviesArray.length; i++){
            if(movies[moviesArray[i]].votes > movies[moviesArray[currentWinner]].votes){
                currentWinner = i;
            }
        }
        winner = int(currentWinner);
        state = "over";
        emit WinnerDeclared(currentWinner);
    }
    
    function finishVoting() public onlyOwner voting {
        state = "wfw";
        emit VotingOver();
    }
    
    
    
    
}