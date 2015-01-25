/*global require*/
require.config({
    baseUrl: "../"
});

require(["src/changelog", "src/changeset"], function (ChangeLog, ChangeSet) {
    "use strict";

    var A;

    window.ChangeSet = ChangeSet;
    window.changeLog = A = new ChangeLog("A");

    changeLog.addChangeSet(new ChangeSet({
        A: 5,
        B: 2
    }));

    changeLog.addChangeSet(new ChangeSet({
        A: 3,
        B: 1
    }));

    changeLog.addChangeSet(new ChangeSet({
        A: 4,
        B: 2
    }));





});
