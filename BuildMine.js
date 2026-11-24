"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildMine = exports.COMPLETE = void 0;
const BuildingMine_1 = require("./Rules/BuildingMine");
const DelayedAction_1 = require("@civ-clone/core-unit/DelayedAction");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const Mine_1 = require("@civ-clone/base-tile-improvement-mine/Mine");
const registerDelayedAction_1 = require("@civ-clone/core-unit/registerDelayedAction");
exports.COMPLETE = 'base-unit-action-build-mine:complete';
class BuildMine extends DelayedAction_1.default {
    perform() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.default, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost || 0, exports.COMPLETE, BuildingMine_1.default);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.BuildMine = BuildMine;
// Registered here rather than passed to `perform` as a closure: a closure
// cannot be written to a file, which is why a unit part-way through this could
// not be saved. The save records the identifier; the behaviour stays here.
(0, registerDelayedAction_1.default)({
    BusyRule: BuildingMine_1.default,
    handler: exports.COMPLETE,
    // Built from the game the unit is loaded into, so finishing after a load writes where that game looks
    //  (civ-clone/web-renderer#248).
    action: (unit, context) => new BuildMine(unit.tile(), unit.tile(), unit, context.rules, context.turn, context.pendingEffects),
    // Through the rules the action was built with, the game's own, so its `Built` rules register it there.
    complete: (unit, pendingEffect, action) => {
        new Mine_1.default(unit.tile(), action.ruleRegistry());
    },
});
exports.default = BuildMine;
//# sourceMappingURL=BuildMine.js.map