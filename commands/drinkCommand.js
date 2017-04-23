/**
 * drinkCommand.js
 *
 * Serve a drink to the viewer
 *
 */
(function() {
    $.bind('command', function(event) {
        var command = event.getCommand(),
            args = event.getArgs(),
            sender = event.getSender(),
            action = args[0],
            value;

        var addStatusCodes = {0: "added to",
                              1: "already in",
                              2: "NOT added to"};

        var delStatusCodes = {0: "removed from",
                              1: "wasn't in",
                              2: "NOT removed from"};

        if (command.equalsIgnoreCase('drink')) {
            $.say($.getRandomValue('greetings') + " " + $.resolveRank(sender) + ", please enjoy this " + $.getRandomValue('preparations') + " glass of " + $.getRandomValue('drinks') + "!");
        } else if (command.equalsIgnoreCase('addgreeting')) {
            if (!args[0]) {
                $.say("Usage: !addgreeting [greeting]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Greeting \"" + value + "\" " + addStatusCodes[$.addValue('greetings', value)] + " my vocabulary!");
            }
        } else if (command.equalsIgnoreCase('addpreparation')) {
            if (!args[0]) {
                $.say("Usage: !addpreparation [preparation]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Preparation \"" + value + "\" " + addStatusCodes[$.addValue('preparations', value)] + " my skillset!");
            }
        } else if (command.equalsIgnoreCase('adddrink')) {
            if (!args[0]) {
                $.say("Usage: !adddrink [drink]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Drink \"" + value + "\" " + addStatusCodes[$.addValue('drinks', value)] + " my kitchen!");
            }
        } else if (command.equalsIgnoreCase('delgreeting')) {
            if (!args[0]) {
                $.say("Usage: !delgreeting [greeting]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Greeting \"" + value + "\" " + delStatusCodes[$.delValue('greetings', value)] + " my vocabulary!");
            }
        } else if (command.equalsIgnoreCase('delpreparation')) {
            if (!args[0]) {
                $.say("Usage: !delpreparation [preparation]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Preparation \"" + value + "\" " + delStatusCodes[$.delValue('preparations', value)] + " my skillset!");
            }
        } else if (command.equalsIgnoreCase('deldrink')) {
            if (!args[0]) {
                $.say("Usage: !deldrink [drink]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Drink \"" + value + "\" " + delStatusCodes[$.delValue('drinks', value)] + " my kitchen!");
            }
        } else if (command.equalsIgnoreCase('getgreetings')) {
            $.say($.getList('greetings').join(', '));

        } else if (command.equalsIgnoreCase('getpreparations')) {
            $.say($.getList('preparations').join(', '));

        } else if (command.equalsIgnoreCase('getdrinks')) {
            $.say($.getList('drinks').join(', '));
        }

        return;
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./commands/drinkCommand.js', 'drink', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'addgreeting', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'addpreparation', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'adddrink', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'delgreeting', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'delpreparation', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'deldrink', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'getgreetings', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'getpreparations', 7);
        $.registerChatCommand('./commands/drinkCommand.js', 'getdrinks', 7);
    });
})();