/**
 * factCommand.js
 *
 * Say a random fact
 *
 */
(function() {


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
                value = $.getRandomKeyValue('catfacts');
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
                $.say("\"" + value + "\" " + addStatusCodes[$.addValue('catfacts', value)] + "!");
            }
        } else if (command.equalsIgnoreCase('delcatfact')) {
            if (!args[0]) {
                $.say("Usage: !delcatfact [catfact id]");
            } else {
                value = args.splice(0).join(' ');
                $.say("\"" + value + "\" " + delStatusCodes[$.delValue('catfacts', value)] + "!");
            }
        }

        return;
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./bortybot/commands/factCommand.js', 'catfact', 7);
        $.registerChatCommand('./bortybot/commands/factCommand.js', 'addcatfact', 7);
        $.registerChatCommand('./bortybot/commands/factCommand.js', 'delcatfact', 7);
    });
})();