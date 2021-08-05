
const urlLaodUser = 'http://localhost:3000/users';
const urlLoadUserCountAndAge = 'http://localhost:3000/users/age/';
const dropDownValues = ['carrot', 'apple', 'grapes','crackers', 'chips', 'cake', 'tv','ham', 'beef'];

ReactDOM.render(
        <App />,
        document.getElementById('root')
);

function App() {
    return (
      <div className="container">
          <div className="row">
            <LoadUsers/>
            <LoadAgeDemographicOfUser/>
          </div>
      </div>
    );
}

function LoadUsers(){
    const [users, setUsers] = React.useState([]);
    React.useEffect(async ()=>{
        let result = await axios.get(urlLaodUser);
        setUsers(result.data);
    },[users]);
    
    const getUserList = ()=>{
       return  users.map((item,index)=>{
            return <tr key={index}><th>{item.username}</th><th>{item.age}</th></tr>
        })
    }

    return (
        <div className="col-md-12  col-lg-12 col-xl-12 col-xxl-12">
            <h1>All Users</h1> 
            <h6>Show the User and Their Age</h6>      
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                   {getUserList()}
                </tbody>
             </table>
        </div>
    )
}
function LoadAgeDemographicOfUser(){

    const [usersAge, setUsersAge] = React.useState([]);
    const [name, setName] = React.useState('');

    const handleClick = async (e)=>{
       let urlCall = urlLoadUserCountAndAge+ e.target.getAttribute('value');
       let result = await axios(urlCall);
       let userAgeCountArray = [];
       if(result.hasOwnProperty('data') && result.data.length > 0){
            userAgeCountArray = result.data
       }
       setName(e.target.getAttribute('value'));
       setUsersAge(userAgeCountArray);
    }  
    const getItemDropDown = ()=>{
        return dropDownValues.map((item,index)=>{
            return <li key={index}  onClick={handleClick}><a className="dropdown-item" value={item} href="#">{item}</a></li>
        })
    } 
    const getUserAgeAndCount = ()=>{
        return usersAge.map((item,index)=>{
            return <tr key={index}><th>{item.age}</th><th>{item.value}</th></tr>
        })
    }
    return (
        <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <h1>Age Demogragh of users with <span className = "userSelectItem">{name}</span></h1>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Item
                    </button>
                    <ul className="dropdown-menu">
                        {getItemDropDown()}
                    </ul>
                </div>
             <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Age</th>
                    <th scope="col">Count</th>
                    </tr>
                </thead>
                <tbody>
                   {getUserAgeAndCount()}
                </tbody>
             </table>
        </div>
    )
}
