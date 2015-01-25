/*global define, hex_md5*/
define(["./md5-min"], function () {
    "use strict";

    /**
     * Merges the second clock into the first
     * @param {Clock} clockA target clock
     * @param {Clock} clockB source clock
     */
    function mergeClocks(clockA, clockB) {
        var prevItem;

        Object.keys(clockA)
            .concat(Object.keys(clockB))
            .sort()
            .forEach(function (item) {
                if (item !== prevItem) {
                    clockA[item] = Math.max(clockA[item] || 0, clockB[item] || 0);
                }
                prevItem = item;
            });

        return clockA;
    }

    /**
     * Calculates the mutual parent of two clock
     * @param   {Clock} clockA first clock
     * @param   {Clock} clockB second clock
     * @returns {Clock} the mutual parent
     */
    function getMutualParent(clockA, clockB) {
        var keysA = Object.keys(clockA),
            keysB = Object.keys(clockB),
            l = keysA.length,
            keys = keysA,
            A = clockA,
            B = clockB,
            mutualParent = {};

        if (l > keysB.length) {
            keys = keysB;
            l = keysB.length;
            A = clockB;
            B = clockA;
        }

        keys.forEach(function (item) {
            if (B.hasOwnProperty(item)) {
                mutualParent[item] = Math.min(A[item], B[item]);
            }
        });

        return mutualParent;
    }

    function equals(clockA, clockB) {
        var keysA = Object.keys(clockA),
            keysB = Object.keys(clockB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        return keysA.every(function (item) {
            if (clockB.hasOwnProperty(item) === false) {
                return false;
            }
            if (clockB[item] !== clockA[item]) {
                return false;
            }

            return true;
        });

    }

    function getHash(clock) {
        return hex_md5(JSON.stringify(clock));
    }

    function increment(clock, id) {
        clock[id] = clock[id] + 1 || 1;
        return clock;
    }

    return {
        getMutualParent: getMutualParent,
        mergeClocks: mergeClocks,
        getHash: getHash,
        equals: equals,
        increment: increment
    };
});