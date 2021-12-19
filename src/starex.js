const config = require("../config.json");
const { firestore, firebase } = require('./firebase');
const { doc, setDoc, getDocs, collection, query, where } = require('firebase/firestore');
const { nanoid } = require('nanoid'); 

module.exports.sendTransaction = async function sendTransaction(client, message, sender, reciever, quantity) {
    
    const transactionRef = collection(firestore, "transactions");
    const transactionQuery = query(transactionRef, where("message_id", "==", message.id), where("sender_id", "==", sender.id));

    const querySnapshot = await getDocs(transactionQuery);
    if (querySnapshot.size > 0) return;

    const transactionId = nanoid();
    await setDoc(doc(transactionRef, transactionId), {
        sender_id: sender.id,
        reciever_id: reciever.id,
        message_id: message.id,
        quantity: quantity
    });
    
    const channel = client.channels.cache.get(config.bot.starex_channel_id);
    channel.send(`**${sender.username}** awarded **${reciever.username}** a ⭐. \n*(Transaction ID: ${transactionId})*`);
}