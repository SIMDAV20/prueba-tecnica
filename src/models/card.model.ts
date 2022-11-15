
export class Card {
    constructor(
        public email: string,
        public card_number: string,
        public cvv: string,
        public expiration_year: string,
        public expiration_month: string,
        public id?: string,
        public token?: string,
        public expireIn?: Date,
        public createdAt ?: Date,
    ){}
}
