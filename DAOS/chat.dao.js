import { chat_model } from "../models.js";



const addMsg = async (msg) => {

    const message = await chat_model.create(msg)

}



const getMsg = async () => {

    const messages = await chat_model.find()

    return messages

}


export {
    addMsg,
    getMsg
}