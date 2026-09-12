const path = require("path");
const fg = require("fast-glob");

module.exports = function loadEvents(client) {
    const eventsFolder = path.join(__dirname, "..", "events");
    const eventPaths = fg.sync("**/*.js", {cwd: eventsFolder, absolute: true})

    let loaded = 0;
    let failed = false;

    console.log(`Registering ${eventPaths.length} events...`);

    eventPaths.forEach(path => {
        const event = require(path);

        if (event.name === undefined || event.once === undefined || event.run === undefined) {
            console.error(`Registering event ${path} failed; missing required attributes.`);
            failed = true;
            return;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.run(...args, client));
        } else {
            client.on(event.name, (...args) => event.run(...args, client));
        }

        console.log(`Registered event "${event.name}" successfully.`);
        loaded++;
    });

    if (failed) {
        console.error("Failed to register one or more events, exiting.");
        process.exit(1);
    } else {
        console.log(`Finished; registered ${loaded} events\n`);
    }
}