const mongoose = require('mongoose');


/**
 * @swagger
 * components: 
 *  schemas:
 *   Trgovine:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *     lokacija:
 *      type: string
 *     prevzem:
 *      type: string
 *      enum: ['DA', 'NE']
 *     lng:
 *      type: number
 *     lat:
 *      type: number
 *    required:
 *     - ime
 *     - lokacija
 *     - prevzem
 *     - lng
 *     - lat
 * 
 * 
 */
const trgovineShema = new mongoose.Schema({
    ime: {type: String, required: true},
    lokacija: {type: String, required: true},
    prevzem: {type: String, enum: ['DA', 'NE']},
    lng: {type:Number, required: true},
    lat: {type:Number, required: true}
});

mongoose.model('Trgovina',trgovineShema, 'Trgovine');