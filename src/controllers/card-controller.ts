import { Card } from './../models/card.model';
import { v4 as uuidv4 } from 'uuid';

import AWS from 'aws-sdk';
import { validJsonCard } from '../helpers/validators';
import { generarJWT } from '../helpers/generate-token';
import { checkToken } from '../helpers/valid-token';


export const createToken = async (event: any) => {

    try {
        
        const { status, message } = validJsonCard(JSON.parse(event.body));

        if(!status) {
            return {
                status: 400,
                message
            }
        }

        const dynamodb =  new AWS.DynamoDB.DocumentClient();
        
        const  { 
            email,
            card_number,
            cvv,
            expiration_year,
            expiration_month,
        } = JSON.parse(event.body);


        const createdAt = new Date();
        const id = uuidv4();

        const { token, expireIn } = generarJWT();

        const newCard: Card = {
            email,
            card_number,
            cvv,
            expiration_year,
            expiration_month,
            id,
            token,
            expireIn,
            createdAt,
        }


        await dynamodb.put({
            TableName: 'CardsTable',
            Item: newCard
        }).promise();


        return {
            status: 200,
            body: JSON.stringify(newCard)
        }

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: error
        }
    }

    
}

export const findCardInfo = async (event: any) => {
    try {
        
        const { token } = event.body

        const dynamodb =  new AWS.DynamoDB.DocumentClient();

        const result = await dynamodb.get({
            TableName: 'CardsTable',
            Key: {
                token
            }
        }).promise();

        const card = result.Item;

        if (!card) {
            return {
                status: 404,
                message: 'Tarjeta no encontrada'
            }
        }

        const { status, message } = checkToken(card.token, card.expireIn);

        if(!status) {
            return {
                status: 400,
                message
            }
        }

        // SI TODO BIEN

        const { cvv, ...params } = card;

        return {
            status: 200,
            body: JSON.stringify(params)
        }


        
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: error
        }
    }
}

