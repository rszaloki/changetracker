/*global define*/
define(["changelog", "changeset"], function (ChangeLog, ChangeSet) {

    "use strict";

    var Sync = {};

    Sync.addChanges = function (destination, changes) {
        var change = changes.pop();
        while (change) {
            destination.addChangeSet(ChangeSet.fromObject(change));
            change = changes.pop();
        }
    };

    Sync.pull = function (destination, source) {
        var changes;

        changes = source.getChangesFrom(destination.HEAD);

        // communication start
        changes = JSON.stringify(changes);
        changes = JSON.parse(changes);
        // communication end

        Sync.addChanges(destination, changes);
    };

    return Sync;
});
