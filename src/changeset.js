/*global define*/
define(["clock"], function (Clock) {

    "use strict";

    /**
     * Changeset object
     * @param {Clock} clock changeset's clock
     */
    function ChangeSet(clock) {
        this.previous = null;
        this.next = null;
        this.version = "";
        this.clock = null;
        this.setClock(clock);
        this.generateHash();
    }

    ChangeSet.fromObject = function (obj) {
        var changeSet = new ChangeSet();
        changeSet.setClock(obj.clock);
        changeSet.version = obj.version;

        return changeSet;
    };

    ChangeSet.dump = function (changeSet) {
        return changeSet.version + " " + JSON.stringify(changeSet.clock);
    };

    /**
     * Generate hash from clock
     */
    ChangeSet.prototype.generateHash = function () {
        if (this.version === "" && this.clock !== null) {
            this.version = Clock.getHash(this.clock);
        }
    };

    /**
     * Sets the clock
     * @param {Clock} clock
     */
    ChangeSet.prototype.setClock = function (clock) {
        if (clock) {
            this.clock = clock;
        }
    };

    ChangeSet.prototype.dump = function () {
        return ChangeSet.dump(this);
    };

    ChangeSet.prototype.toJSON = function () {
        return {
            version: this.version,
            clock: this.clock
        };
    };

    return ChangeSet;
});
