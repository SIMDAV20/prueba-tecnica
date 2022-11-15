// import { sign } from 'jsonwebtoken'

export const generarJWT = () => {

    let token = generate_token(16);
    token = 'pk_test_'+token

    let expireIn = timeExpire(1);

    return {token, expireIn};
}


const generate_token = (length: number) => {
    let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    let b = [];  
    for (let i=0; i<length; i++) {
        let j: any = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

const timeExpire = (minutes: number) => {
    let now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    now = new Date(now);
    
    return now;
}