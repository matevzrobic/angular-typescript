const mongoose = require('mongoose');

/**
 * @swagger
 * components: 
 *  schemas:
 *   Kuponi:
 *    type: object
 *    properties:
 *     niz:
 *      type: string
 *     popust:
 *      type: number
 *      minimum: 1
 *      maximum: 99
 *      example: 20
 *     datum:
 *      type: string
 *      format: date-time
 *      example: 2019-12-26T14:12:06.488Z
 *    required:
 *     - niz
 *     - popust
 *     - datum
 */

 

const kuponiShema = new mongoose.Schema({
    niz: {type: String, unique: true, required: true},
    popust: {type: Number, min: 1, max: 99, required: true},
    datum: {type: Date, required:true}
});

mongoose.model("Kupon", kuponiShema, "Kuponi");
