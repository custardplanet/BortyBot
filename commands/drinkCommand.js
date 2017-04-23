/**
 * drinkCommand.js
 *
 * Serve a drink to the viewer

 * If the code is doing something really stupid, it's because the Phantombot ORM
 * is REALLY bad and I didn't feel like overhauling it to develop this feature.
 *
 */
(function() {
    /* made up status codes because the shitty ORM doesn't return any -
     * 0: add attempted and successful
     * 1: value already in table
     * 2: add attmpted and unsuccessful
     */
    function addValue(table, value) {
        var id,
            status = 0;

        // make sure we don't insert duplicate rows because the shitty ORM doesn't check for you
        if (getKeyOfValue(table, value) >= 0) {
            status = 1;
        } else {
            // get max key and add 1 since you need to provide a key for the stupid set procedure
            id = Math.max.apply(null, $.inidb.GetKeyList(table, '').map(Number)) + 1;
            $.inidb.set(table, id, value);

            if (getKeyOfValue(table, value) == -1) {
                status = 2;
            }
        }

        return status;
    }

    /* made up status codes because the shitty ORM doesn't return any -
     * 0: del attempted and successful
     * 1: value wasn't in table
     * 2: del attmpted and unsuccessful
     */
    function delValue(table, value) {
        var status = 0,
            key = getKeyOfValue(table, value);

        if (key == -1) {
            status = 1;
        } else {
            $.inidb.del(table, key);

            if (getKeyOfValue(table, value) >= 0) {
                status = 2;
            }
        }

        return status;
    }

    function getRandomValue(table) {
        return $.inidb.get(table, $.randElement($.inidb.GetKeyList(table, '')));
    }

    function getList(table) {
        var keys = $.inidb.GetKeyList(table, ''),
            list = [],
            i;

        for (i in keys) {
            list.push($.inidb.get(table, keys[i]));
        }

        return list;
    }

    // support function to return key of a value because shitty ORM can't do this
    function getKeyOfValue(table, value) {
        var matches = $.inidb.searchByValue(table, value),
            key = -1,
            i;

        for (i in matches) {
            if ($.inidb.get(table, matches[i]) == value) {
                key = matches[i];
                break;
            }
        }

        return key;
    }

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
            $.say(getRandomValue('greetings') + " " + $.resolveRank(sender) + ", please enjoy this " + getRandomValue('preparations') + " glass of " + getRandomValue('drinks') + "!");
        } else if (command.equalsIgnoreCase('addgreeting')) {
            if (!args[0]) {
                $.say("Usage: !addgreeting [greeting]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Greeting \"" + value + "\" " + addStatusCodes[addValue('greetings', value)] + " my vocabulary!");
            }
        } else if (command.equalsIgnoreCase('addpreparation')) {
            if (!args[0]) {
                $.say("Usage: !addpreparation [preparation]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Preparation \"" + value + "\" " + addStatusCodes[addValue('preparations', value)] + " my skillset!");
            }
        } else if (command.equalsIgnoreCase('adddrink')) {
            if (!args[0]) {
                $.say("Usage: !adddrink [drink]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Drink \"" + value + "\" " + addStatusCodes[addValue('drinks', value)] + " my kitchen!");
            }
        } else if (command.equalsIgnoreCase('delgreeting')) {
            if (!args[0]) {
                $.say("Usage: !delgreeting [greeting]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Greeting \"" + value + "\" " + delStatusCodes[delValue('greetings', value)] + " my vocabulary!");
            }
        } else if (command.equalsIgnoreCase('delpreparation')) {
            if (!args[0]) {
                $.say("Usage: !delpreparation [preparation]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Preparation \"" + value + "\" " + delStatusCodes[delValue('preparations', value)] + " my skillset!");
            }
        } else if (command.equalsIgnoreCase('deldrink')) {
            if (!args[0]) {
                $.say("Usage: !deldrink [drink]");
            } else {
                value = args.splice(0).join(' ');
                $.say("Drink \"" + value + "\" " + delStatusCodes[delValue('drinks', value)] + " my kitchen!");
            }
        } else if (command.equalsIgnoreCase('getgreetings')) {
            $.say(getList('greetings').join(', '));

        } else if (command.equalsIgnoreCase('getpreparations')) {
            $.say(getList('preparations').join(', '));

        } else if (command.equalsIgnoreCase('getdrinks')) {
            $.say(getList('drinks').join(', '));
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