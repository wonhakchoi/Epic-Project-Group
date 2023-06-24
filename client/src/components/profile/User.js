export default function ProfilePage() {    
    return (
        <div className="user">
                <div>
                    <img className="user-image" src={"/images/user-icons/raccoon.png"} alt="image not found" />
                </div>
                <div className="user-descriptor">
                    <label id="name">Cedric Pulmano</label> <br />
                    <label id="description">Student at UBC, majoring in Computer Science. Passionate <br />
                    about web dev and likes to eat food.</label>
                </div>  
            </div>
    );
}