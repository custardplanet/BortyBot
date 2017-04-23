/**
 * factCommand.js
 *
 * Say a random fact

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

    function getRandomKeyValue(table) {
        var key = $.randElement($.inidb.GetKeyList(table, ''));
        return [key, $.inidb.get(table, key)];
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

        var addStatusCodes = {0: "added",
                              1: "already exists",
                              2: "NOT added"};

        var delStatusCodes = {0: "removed",
                              1: "didn't exist",
                              2: "NOT removed"};

        if (command.equalsIgnoreCase('catfact')) {
            if (!args[0]) {
                value = getRandomKeyValue('catfacts');
                $.say("Cat Fact #" + value[0] + ": " + value[1]);
            } else {
                if (value = $.inidb.get('catfacts', args[0])) {
                    $.say("Cat Fact #" + args[0] + ": " + value);
                } else {
                    $.say("Cat Fact #" + args[0] + " does not exist!");
                }
            }
        } else if (command.equalsIgnoreCase('addcatfact')) {
            if (!args[0]) {
                $.say("Usage: !addcatfact [catfact]");
            } else {
                value = args.splice(0).join(' ');
                $.say("\"" + value + "\" " + addStatusCodes[addValue('catfacts', value)] + "!");
            }
        } else if (command.equalsIgnoreCase('delcatfact')) {
            if (!args[0]) {
                $.say("Usage: !delcatfact [catfact id]");
            } else {
                value = args.splice(0).join(' ');
                $.say("\"" + value + "\" " + delStatusCodes[delValue('catfacts', value)] + "!");
            }
        }

        return;
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./commands/factCommand.js', 'catfact', 7);
        $.registerChatCommand('./commands/factCommand.js', 'addcatfact', 7);
        $.registerChatCommand('./commands/factCommand.js', 'delcatfact', 7);
    });
})();