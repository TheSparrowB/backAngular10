export class RESPONSE {

    constructor(
        public status: number,
        public result?: any,
        public message?: string,
    ){

    }
}