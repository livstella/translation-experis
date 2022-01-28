//username is destructured from props list, it is given to profileheader by Profile view which gets it from the context using useUser
const ProfileHeader = ({username}) => {
    return (
        <header>
            <h4>Hello, welcome back {username}</h4>
        </header>
    )
}

export default ProfileHeader