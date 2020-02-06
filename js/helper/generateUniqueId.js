const generateUniqueId = () => {
    const uniqueId = new Date().getTime();

    return uniqueId;
};

export default generateUniqueId;