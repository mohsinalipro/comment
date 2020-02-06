const randomUsername = () => {
    const usernames = [
        'Ashish',
        'Ravi',
        'Suraj',
        'Saru',
        'Mano',
        'Debo'
    ];

    return usernames[Math.floor(Math.random() * usernames.length)];
};

export default randomUsername;