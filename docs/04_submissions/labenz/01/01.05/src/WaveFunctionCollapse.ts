import p5 from 'p5';
import { RULES } from './rules';
import { Cell, Neighbor, Position, Rules, TILES, TileType } from './types';

export class WaveFunctionCollapse {
  private width: number;
  private height: number;
  private grid: Cell[][];
  private p5Instance: p5;
  private tileImages: Record<number, p5.Image>;
  private readonly TILE_SIZE = 32;
  private rules: Rules = RULES;

  constructor(
    p5Instance: p5,
    width: number,
    height: number,
    tileImages: Record<number, p5.Image>
  ) {
    this.p5Instance = p5Instance;
    this.width = width;
    this.height = height;
    this.tileImages = tileImages;
    this.grid = [];

    const allOptions = Object.values(TILES) as TileType[];

    for (let y = 0; y < height; y++) {
      this.grid[y] = [];
      for (let x = 0; x < width; x++) {
        this.grid[y][x] = {
          collapsed: false,
          options: allOptions,
        };
      }
    }
  }

  private findLowestEntropy(): Position | null {
    let minEntropy = Infinity;
    let cells: Position[] = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.grid[y][x];
        if (!cell.collapsed) {
          if (cell.options.length < minEntropy) {
            minEntropy = cell.options.length;
            cells = [{ x, y }];
          } else if (cell.options.length === minEntropy) {
            cells.push({ x, y });
          }
        }
      }
    }

    if (cells.length > 0) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
    return null;
  }

  private collapseCell(x: number, y: number): TileType {
    const cell = this.grid[y][x];

    if (!cell.options || cell.options.length === 0) {
      cell.collapsed = true;
      cell.options = [TILES.EMPTY];
      return TILES.EMPTY;
    }

    const randomIndex = Math.floor(Math.random() * cell.options.length);
    const selectedOption = cell.options[randomIndex];

    if (selectedOption === undefined || selectedOption === null) {
      cell.collapsed = true;
      cell.options = [TILES.EMPTY];
      return TILES.EMPTY;
    }

    cell.collapsed = true;
    cell.options = [selectedOption];

    return selectedOption;
  }

  private propagate(startX: number, startY: number): void {
    const stack: Position[] = [{ x: startX, y: startY }];

    while (stack.length > 0) {
      const current = stack.pop()!;
      const cell = this.grid[current.y][current.x];

      if (!cell.collapsed || cell.options.length === 0) {
        continue;
      }

      const currentValue = cell.options[0];

      if (currentValue === undefined || currentValue === null) {
        continue;
      }

      const neighbors: Neighbor[] = [
        { dx: 0, dy: -1, direction: 'top' },
        { dx: 1, dy: 0, direction: 'right' },
        { dx: 0, dy: 1, direction: 'bottom' },
        { dx: -1, dy: 0, direction: 'left' },
      ];

      for (const { dx, dy, direction } of neighbors) {
        const newX = current.x + dx;
        const newY = current.y + dy;

        if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height) {
          const neighborCell = this.grid[newY][newX];

          if (!neighborCell.collapsed) {
            if (!this.rules[currentValue]) {
              continue;
            }

            if (!this.rules[currentValue][direction]) {
              continue;
            }

            const validOptions = this.rules[currentValue][direction];
            if (!neighborCell.options || neighborCell.options.length === 0) {
              continue;
            }

            const oldLength = neighborCell.options.length;
            const newOptions = neighborCell.options.filter((option) =>
              validOptions.includes(option)
            );

            if (newOptions.length < oldLength) {
              neighborCell.options = newOptions;
              stack.push({ x: newX, y: newY });
            }
          }
        }
      }
    }
  }

  public generate(): void {
    while (true) {
      const cellToCollapse = this.findLowestEntropy();
      if (!cellToCollapse) {
        break;
      }

      this.collapseCell(cellToCollapse.x, cellToCollapse.y);
      this.propagate(cellToCollapse.x, cellToCollapse.y);
    }
  }

  public draw(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.grid[y][x];
        if (cell.collapsed) {
          const tileType = cell.options[0];
          this.p5Instance.image(
            this.tileImages[tileType],
            x * this.TILE_SIZE,
            y * this.TILE_SIZE,
            this.TILE_SIZE,
            this.TILE_SIZE
          );
        } else {
          this.p5Instance.fill(200);
          this.p5Instance.rect(
            x * this.TILE_SIZE,
            y * this.TILE_SIZE,
            this.TILE_SIZE,
            this.TILE_SIZE
          );
        }
      }
    }
  }
}
