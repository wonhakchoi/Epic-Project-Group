/**
 * Represents the icon locations in an array
 */

const initialIconLocations = [
    "/images/user-icons/space-man.png",
    "/images/user-icons/raccoon.png",
    "/images/user-icons/giraffe.png",
    "/images/user-icons/panda.png",
    "/images/user-icons/chick.png",
    "/images/user-icons/ghost.png",
    "/images/user-icons/girl.png",
    "/images/user-icons/man.png",
];

const iconLocations = (icons = initialIconLocations, action) => {
    switch (action.type) {
        default:
            return icons;
    }
};

export default iconLocations;
