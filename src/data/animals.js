const animals = [
    {
        img: "https://media.suara.com/pictures/653x366/2019/07/11/38866-ilustrasi-gajah-unsplashjager.jpg",
        name: "gajah"
    },
    {
        img: "https://awsimages.detik.net.id/community/media/visual/2021/11/04/zebra-di-etosha-national-park-namibia-afika.jpeg?w=700&q=90",
        name: "zebra"
    },
    {
        img: "https://images.bisnis-cdn.com/thumb/posts/2017/09/12/689135/kangguru.jpg?w=400&h=400",
        name: "kanguru"
    },
    {
        img: "https://1.bp.blogspot.com/-EbR7g6gpTQ4/XtP0TtpgSyI/AAAAAAAACOk/zBxw0HPtdN46aVzYHsF7JY6JUkHaqnXYACNcBGAsYHQ/s1600/GettyImages-872346454-5c37b2dec9e77c000132a628.jpg",
        name: "jerapah"
    },
    {
        img: "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/serangan-buaya-ilustrasi-buaya.jpg",
        name: "buaya"
    }
]

const shuffle = (array, array1) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return [array, array1];
}

const funtRandom = (data) => {
    let loop = true
    const res = [];
    const finaly = []
    const length = animals.length
    res.push(animals[Math.floor(Math.random() * length)])
    while (loop) {
        const response = animals[Math.floor(Math.random() * length)]
        res.forEach(e => {
            if (e.name != response.name) res.push(response)
        });
        if (res.length > 3) loop = false
    }
    return shuffle(res, res[0])
}


export default funtRandom;