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

    // add functions to api
    $.addValue = addValue;
    $.delValue = delValue;
    $.getRandomValue = getRandomValue;
    $.getList = getList;
    $.getRandomKeyValue = getRandomKeyValue;
    $.getKeyOfValue = getKeyOfValue;
})();