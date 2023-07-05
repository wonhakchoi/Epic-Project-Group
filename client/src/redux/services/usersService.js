import axios from "axios";

const getUsers = async () => {
    const users = await axios.get("http://localhost:3001/users");
    return users;
};

const UserService = {
    getUsers,
};

export default UserService;
