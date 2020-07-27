import axios from 'axios';

const instance =axios.create({
    baseURL:'https://react-my-burger-a082b.firebaseio.com/'
});


export default instance;