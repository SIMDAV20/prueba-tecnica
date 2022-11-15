export const checkToken = (token: string, expireIn: Date) => {
    token = token.split('_')[2];

    if (!token) {
        return {
        status: false,
        message: 'El token es inválido'
        }
    }
    
    let diff = (new Date(expireIn).getTime() - new Date().getTime());
    
    if (diff <= 0) {
        return {
            status: false,
            message: 'El token ya fue expirado'
        }
    }
    
    return {
        status: true,
        message: 'token vigente'
    }

} 