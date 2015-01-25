/*global define,console*/
define(["./changeset", "./clock"], function (ChangeSet, Clock) {
    "use strict";

    function ChangeLog(profileId) {
        this.profile = profileId;
        this.HEAD = null;
    }

    ChangeLog.prototype.commit = function () {
        var headClock = (this.HEAD && this.HEAD.clock) || {},
            newClock = Clock.mergeClocks({}, headClock);

        Clock.increment(newClock, this.profile);
        this.addChangeSet(new ChangeSet(newClock));
    };

    ChangeLog.prototype.dump = function () {
        var current = this.HEAD;
        do {
            console.log(JSON.stringify(current.clock));
            current = current.previous;
        } while (current);
    };

    ChangeLog.prototype.addChangeSet = function (changeSet) {
        var version = changeSet.version,
            mutualParent,
            currentIsMutualParent = false,
            current = null;

        this[version] = changeSet;

        if (this.HEAD === null) {
            this.HEAD = changeSet;
        } else {


            do {
                if (current === null) {
                    current = this.HEAD;
                } else {
                    current = current.previous;
                }

                mutualParent = Clock.getMutualParent(current.clock, changeSet.clock);
                currentIsMutualParent = Clock.equals(mutualParent, current.clock);
            } while (currentIsMutualParent === false && current.previous);

            if (currentIsMutualParent === true) {
                changeSet.next = current.next;
                changeSet.previous = current;
                current.next = changeSet;
                if (changeSet.next) {
                    changeSet.next.previous = changeSet;
                }
            } else {
                changeSet.next = current;
                current.previous = changeSet;
            }

            if (changeSet.next === null) {
                this.HEAD = changeSet;
            }

        }

        this.dump();
        console.log("----");
    };

    return ChangeLog;
});
