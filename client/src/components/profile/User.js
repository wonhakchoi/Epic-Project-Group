export default function User({ name, biography, icon }) {
    return (
        <div className="user">
            <div>
                <img className="user-image" src={icon} alt="image not found" />
            </div>
            <div className="user-descriptor">
                <label id="name">{name}</label> <br />
                <label id="description">{biography}</label>
            </div>
        </div>
    );
}
