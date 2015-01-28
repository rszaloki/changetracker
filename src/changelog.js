/*global define,console*/
define(["changeset", "clock"], function (ChangeSet, Clock) {
    "use strict";

    function ChangeLog(profileId) {
        this.profile = profileId;
        this.HEAD = null;
        this.BASE = null;
    }

    /**
     * Creates a new changeset by incrementing the current HEAD
     */
    ChangeLog.prototype.commit = function () {
        var headClock = (this.HEAD && this.HEAD.clock) || {},
            newClock = Clock.mergeClocks({}, headClock);

        Clock.increment(newClock, this.profile);
        this.addChangeSet(new ChangeSet(newClock));
    };

    /**
     * Dumps the current state of the ChangeLog to the console
     */
    ChangeLog.prototype.dump = function () {
        var current = this.HEAD;
        do {
            console.log(this.profile + " > " + current.dump());
            current = current.previous;
        } while (current);
    };

    ChangeLog.prototype.sliceFrom = function (changeset) {
        var current = changeset,
            result = [];

        if (current === null) {
            return result;
        }

        do {
            result.push(current);
            current = current.next;
        } while (current);

        return result;
    };

    ChangeLog.prototype.rebase = function (changeset) {

        this.sliceFrom(changeset.next).forEach(function (item) {
            Clock.mergeClocks(item.clock, changeset.clock);
        });
    };

    ChangeLog.prototype.findMututalParent = function (changeSet) {
        var current = null,
            mutualParent,
            currentIsMutualParent = false;

        do {
            if (current === null) {
                current = this.HEAD;
            } else {
                current = current.previous;
            }

            mutualParent = Clock.getMutualParent(current.clock, changeSet.clock);
            currentIsMutualParent = Clock.equals(mutualParent, current.clock);
        } while (currentIsMutualParent === false && current.previous);

        return currentIsMutualParent ? current : null;
    };

    ChangeLog.prototype.getChangesFrom = function (changeset) {
        var mutualParent = this.findMututalParent(changeset);

        if (mutualParent === null) {
            mutualParent = this.BASE;
        } else {
            mutualParent = mutualParent.next;
        }

        return this.sliceFrom(mutualParent);
    };

    /**
     * Adds a new changeset and places after it's parent
     * @param {Clock} changeSet the changeset to add
     */
    ChangeLog.prototype.addChangeSet = function (changeSet) {
        var version = changeSet.version,
            mutualParent,
            currentIsMutualParent = false,
            current = null;

        this[version] = changeSet;

        if (this.HEAD === null) {
            this.HEAD = changeSet;
            this.BASE = changeSet;
        } else {

            current = this.findMututalParent(changeSet);

            if (current !== null) {
                changeSet.next = current.next;
                changeSet.previous = current;
                current.next = changeSet;
                if (changeSet.next) {
                    changeSet.next.previous = changeSet;
                }
            } else {

                changeSet.next = this.BASE;
                this.BASE.previous = changeSet;
                this.BASE = changeSet;
            }

            this.rebase(changeSet);

            if (changeSet.next === null) {
                this.HEAD = changeSet;
            }


        }
    };

    return ChangeLog;
});
