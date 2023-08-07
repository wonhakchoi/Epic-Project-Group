export default function User({name, biography}) {    
    return (
        <div className="user">
            <div>
                <img className="user-image" src={"/images/user-icons/raccoon.png"} alt="image not found" />
            </div>
            <div className="user-descriptor">
                <label id="name">{name}</label> <br />
                <label id="description">{biography}</label>
            </div>  
        </div>
    );
}