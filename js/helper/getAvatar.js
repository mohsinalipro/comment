const getAvatar = (username) => {
    const avatars = {
        'Ashish': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user14-95cbccd215b174-s.jpg',
        'Ravi': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user2-565b4bb4c813ca-s.jpg',
        'Suraj': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user13-19873725ed76e2-s.jpg',
        'Saru': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user19-7966a1b638bd69-s.jpg',
        'Mano': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user18-1881baeccb7399-s.jpg',
        'Debo': 'http://easycomment.akbilisim.com/demo/app/upload/member/avatar/ec-user17-919635985f2132-s.jpg'
    }

    return avatars[username];
};

export default getAvatar;