import { Card } from '../models/card.model';

export const validJsonCard = ({ email, card_number, cvv, expiration_month, expiration_year }: Card): { status: boolean; message: string; } => {
    
    // VALIDAR EMAIL
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!(regex.test(email.toLowerCase()))) {
        return {
            status: false,
            message: "Ingrese un correo electrónico correctamente",
        };
    } else {
        let domain = email.split('@')[1];
        if (!(domain == 'gmail.com' || domain == 'hotmail.com' || domain == 'yahoo.es')) {
            return {
                status: false,
                message: "Sólo se pueden registrar correos con los dominios: gmail.com, hotmail.com y yahoo.es",
            };
        }
    }

    // VALIDAR EL CVV
    let primerDig: any = card_number.split("").reverse().join("");
    primerDig = primerDig.charAt(primerDig.length - 1);

    // SI ES VISA (4) O MASTERCARD (5)
    if ((primerDig == 4 || primerDig == 5) && cvv.length !== 3) {
        return {
            status: false,
            message: "El cvv debe ser de 3 caracteres",
        };
    }

    // SI ES AMEDX (3)
    if (primerDig == 3 && cvv.length !== 4) {
        return {
            status: false,
            message: "El cvv debe ser de 4 caracteres",
        };
    }

    // VALIDAR EL MES DE EXP
    if (!(expiration_month.length > 0 && expiration_month.length < 3)) {
        return {
            status: false,
            message: "El mes de expiración debe ser de 1 o 2 caracteres",
        };
    } else {
        let expInt = parseInt(expiration_month);
        if (isNaN(expInt) || !(expInt * 1 > 0 && expInt * 1 < 13)) {
        return {
            status: false,
            message: "El mes de expiración debe ser entre 1 y 12",
        };
        }
    }

    // VALIDAR EL ANIO DE EXP
    if (isNaN(parseInt(expiration_year)) || expiration_year.length !== 4) {
        return {
            status: false,
            message: "El año de expiración debe ser de 4 caracteres",
        };
    } else if (parseInt(expiration_year) > new Date().getFullYear() + 5) {
        return {
            status: false,
            message: "El año de expiración no debe ser mayor a 5 años",
        };
    }

    // VALIDAR EL NRO DE TARJETA
    let numero = 0;
    if (card_number === null || isNaN(parseInt(card_number)) === true) {
        return {
            status: false,
            message: "Ingrese un número de tarjeta válido",
        };
    }

    for (let j = 0; j < card_number.length; j++) {
        if (isNaN(parseInt(card_number.charAt(j))) === true) numero++;
    }

    if (numero > 0)
        return {
            status: false,
            message: "El número de tarjeta contiene letras o carácteres especiales, ingrese un número de tarjeta válido.",
        };
    
    let sum = 0, alt = false, i = card_number.length - 1, num;

    if (card_number.length < 13 || card_number.length > 19) {
        return {
            status: false,
            message: "El número de tarjeta tiene que ser mayor a 13 y menor a 19 dígitos.",
        };
    }

    while (i >= 0) {
        num = parseInt(card_number.charAt(i), 10);
        if (isNaN(num)) {
            return {
                status: false,
                message: 'tarjeta inválida'
            }
        }
        if (alt) {
            num *= 2;
            
            if (num > 9) {
                num = (num % 10) + 1;
            }

        }
        alt = !alt;
        sum += num;
        i--;
    }
    

    if (sum % 10 === 0 && sum !== 0) {
        return {
            status: true,
            message: "tarjeta válida",
        };
    } else {
        return {
            status: false,
            message: "tarjeta inválida",
        };
    }
};