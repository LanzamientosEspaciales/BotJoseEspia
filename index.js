const axios = require("axios");
const fs = require("fs");

const url = "https://halconspace.site/";
const file = "last_version.html";

// 🔹 Pega aquí tu webhook de Discord
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1353906619632717976/6VAIDQidSTODoID75_VhwAYe5JV_qbK8KVq96tKOaXahOgVicGnWHr_wi-0vCBFevXhF";

async function sendDiscordMessage(message) {
    try {
        await axios.post(DISCORD_WEBHOOK_URL, { content: message });
        console.log("✅ Notificación enviada a Discord.");
    } catch (error) {
        console.error("❌ Error al enviar mensaje a Discord:", error);
    }
}

async function checkForChanges() {
    try {
        const response = await axios.get(url);
        const html = response.data;

        if (fs.existsSync(file)) {
            const lastHtml = fs.readFileSync(file, "utf-8");
            if (lastHtml !== html) {
                console.log("🚀 SpaceX ha actualizado su web!");
                sendDiscordMessage("🚀 **SpaceX ha actualizado su sitio web!**\n🔗 [Visita SpaceX](https://www.spacex.com/)");

                fs.writeFileSync(file, html); // Guarda la nueva versión
            } else {
                console.log("✅ No hay cambios en la web.");
            }
        } else {
            fs.writeFileSync(file, html); // Guarda la primera versión
            console.log("🔍 Guardando primera versión de la web.");
        }
    } catch (error) {
        console.error("❌ Error al verificar la web:", error);
        sendDiscordMessage("⚠️ Error al verificar la web de SpaceX.");
    }
}

checkForChanges();
