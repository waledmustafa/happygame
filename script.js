console.log("Hello");

async function getIp() {
    let ip = await fetch("https://ip-api.com/json/");
    let response = await ip.json();
    return response; // Return the entire JSON response
}

async function formatIpInfo() {
    let ipInfo = await getIp();

    // Format the IP information into a more readable format
    let formattedInfo = `**Status:** ${ipInfo.status}\n`;
    formattedInfo += `**Country:** ${ipInfo.country} (${ipInfo.countryCode})\n`;
    formattedInfo += `**Region:** ${ipInfo.regionName} (${ipInfo.region})\n`;
    formattedInfo += `**City:** ${ipInfo.city}\n`;
    formattedInfo += `**ISP:** ${ipInfo.isp}\n`;
    formattedInfo += `**Latitude:** ${ipInfo.lat}\n`;
    formattedInfo += `**Longitude:** ${ipInfo.lon}\n`;
    formattedInfo += `**Timezone:** ${ipInfo.timezone}\n`;
    formattedInfo += `**AS:** ${ipInfo.as}\n`;
    formattedInfo += `**Query:** ${ipInfo.query}`;

    return formattedInfo;
}

async function sendEmbedMessage() {
    // Fetch and format the IP information
    let formattedIpInfo = await formatIpInfo();

    // Construct the message object
    let message = {
        username: 'waledshooter',
        avatar_url: 'https://cdn.discordapp.com/icons/1001444275248173146/ebaeb9cf60fb9fbe70b4b60a24e94efc.webp?size=96',
        allowed_mentions: {
            parse: ['users', 'roles'],
        },
        embeds: [
            {
                color: 11730954,
                author: {
                    name: 'waledshooter',
                    url: 'https://waledshooter.me/',
                    icon_url: 'https://cdn.discordapp.com/icons/1001444275248173146/ebaeb9cf60fb9fbe70b4b60a24e94efc.webp?size=96',
                },
                title: 'User joined Website',
                url: 'https://waledshooter.me/',
                description: formattedIpInfo, // Use the formatted IP information
            },
        ],
    };

    // Send the message to the Discord webhook
    await fetch('https://discord.com/api/webhooks/1222581338549522515/m3lRCVvMd6Gz8r2DIX_E2VJ5mrLX7Yt96FyDrGnE7126Il1uT4SwMa-vymnS7LPkhnPW', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

// Call the function to send the embed message
sendEmbedMessage();
