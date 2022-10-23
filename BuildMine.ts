import BuildingMine from './Rules/BuildingMine';
import DelayedAction from '@civ-clone/core-unit/DelayedAction';
import Mine from '@civ-clone/base-tile-improvement-mine/Mine';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import MovementCost from '@civ-clone/core-unit/Rules/MovementCost';

export class BuildMine extends DelayedAction {
  perform(): void {
    const [moveCost]: number[] = this.ruleRegistry()
      .process(MovementCost, this.unit(), this)
      .sort((a: number, b: number): number => b - a);

    super.perform(
      moveCost || 0,
      (): void => {
        new Mine(this.unit().tile());
      },
      BuildingMine
    );

    this.ruleRegistry().process(Moved, this.unit(), this);
  }
}

export default BuildMine;
