/*global require, console*/
require.config({
    baseUrl: "../src"
});

require(["changelog", "sync"], function (ChangeLog, Sync) {
    "use strict";

    var A, B, C;

    A = new ChangeLog("A");
    B = new ChangeLog("B");
    C = new ChangeLog("C");

    A.commit();
    A.commit();

    console.log("A commit:");
    A.dump();
    console.log("---------");

    B.commit();

    console.log("B commit:");
    B.dump();
    console.log("---------");

    Sync.pull(A, B);

    console.log("A pull B");
    A.dump();
    console.log("---------");

    Sync.pull(B, A);

    console.log("B pull A");
    B.dump();
    console.log("---------");

    B.commit();

    console.log("B commit:");
    B.dump();
    console.log("---------");

    Sync.pull(A, B);

    console.log("A pull B");
    A.dump();
    console.log("---------");

    Sync.pull(B, A);

    console.log("B pull A");
    B.dump();
    console.log("---------");

    A.commit();

    console.log("A commit:");
    A.dump();
    console.log("---------");

    C.commit();

    console.log("C commit:");
    C.dump();
    console.log("---------");

    Sync.pull(A, C);

    console.log("A pull C");
    A.dump();
    console.log("---------");

    Sync.pull(C, A);

    console.log("C pull A");
    C.dump();
    console.log("---------");


    window.A = A;
    window.B = B;
    window.C = C;

});
