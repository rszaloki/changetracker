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
        this.setClock(clock);
    }

    ChangeSet.prototype.setClock = function (clock) {
        if (clock) {
            if (this.version === "") {
                this.version = Clock.getHash(clock);
            }
            this.clock = clock;
        }
    };

    return ChangeSet;
});
