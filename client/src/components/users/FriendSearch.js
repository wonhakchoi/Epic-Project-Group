import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserSearchResult from "./UserSearchResult";
import useDebounce from "../../hooks/useDebounce";
import { determineStatus } from "../../utils/userUtils";
import "./FriendSearch.css";
import { Typography, Box } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#c8dbfa', 0.25),
    '&:hover': {
        backgroundColor: alpha('#d6e6ff', 0.45),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const FriendSearch = () => {
    const usersSlice = useSelector((state) => state.users.allUsers);
    const friendsSlice = useSelector((state) => state.users.userFriends);
    const outRequestsSlice = useSelector((state) => state.users.outgoingRequests);
    const inRequestsSlice = useSelector((state) => state.users.incomingRequests);
    let currUser = useSelector((state) => state.sauth.currUser);

    // returns users whose name includes the given string
    const [name, setName] = useState("");
    const searchResults = useDebounce(name, 500);
    const filteredUsers = usersSlice.users.filter(
        (user) => user.firstName.toLowerCase().includes(searchResults.toLowerCase()) && user._id !== currUser
    );

    // logic for the pagination
    const [offset, setOffset] = useState(0);
    const resultsPerPage = 6;
    const incrementOffset = () => {
        if (offset + resultsPerPage >= Object.keys(filteredUsers).length) {
            return;
        }
        setOffset(offset + resultsPerPage);
    };
    const decrementOffset = () => {
        setOffset(Math.max(0, offset - resultsPerPage));
    };
    useEffect(() => {
        setOffset(0);
    }, [searchResults]);

    return (
        <div className="user-search-container">
            <Typography
                variant="h4"
                component="div"
                sx={{ mb: 5, mt: 5 }}
            >
                Search for Friends
            </Typography>
            <Box sx={{ width: 300, mb: 7 }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Search>
            </Box>

            <div className="user-search-results">
                <Box display="grid" gridTemplateColumns="repeat(3, 300px)" gap={8}>
                    {filteredUsers.slice(offset, offset + resultsPerPage).map((user) => (
                        <UserSearchResult
                            key={user._id}
                            id={user._id}
                            icon={user.icon}
                            name={user.firstName}
                            status={determineStatus(
                                user._id,
                                friendsSlice.friends,
                                outRequestsSlice.outgoingRequests,
                                inRequestsSlice.incomingRequests
                            )}
                        />
                    ))}
                </Box>
                <div className="user-search-results-navigation">
                    <IconButton tooltip="Previous page">
                        <NavigateBeforeIcon
                            onClick={decrementOffset}
                        />
                    </IconButton>
                    <IconButton tooltip="Next page">
                        <NavigateNextIcon
                            tooltip="Next page"
                            onClick={incrementOffset}
                        />
                    </IconButton>

                    <Typography
                        variant="body2"
                        display="block"
                        component="div"
                        position="relative"
                        bottom="0px"
                    >
                        Page {offset / resultsPerPage + 1} out of{" "}
                        {Math.max(1, Math.ceil(Object.keys(filteredUsers).length / resultsPerPage))}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default FriendSearch;
