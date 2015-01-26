/*global define*/
define(["./clock"], function (Clock) {

    "use strict";

    /**
     * Changeset object
     * @param {Clock} clock changeset's clock
     */
    function ChangeSet(clock) {
        this.version = "";
        this.previous = null;
        this.next = null;
        this.clock = null;
        this.setClock(clock);
        this.generateHash();
    }

    ChangeSet.prototype.generateHash = function () {
        if (this.version === "" && this.clock !== null) {
            this.version = Clock.getHash(this.clock);
        }
    };

    ChangeSet.prototype.setClock = function (clock) {
        if (clock) {
            this.clock = clock;
        }
    };

    return ChangeSet;
});
