export class FensTree {
    private current: FenNode;

    constructor(initialPositionFen: string) {
        this.current = {
            fen: initialPositionFen,
            move: null,
            parent: null,
            children: []
        }
    }

    public addFen(fen: string, move: string) {
        for (const child of this.current.children) {
            if (child.fen == fen) {
                this.current = child;
                return;
            }
        }

        const next: FenNode = {
            fen: fen,
            move: move,
            parent: this.current,
            children: []
        }

        this.current.children.push(next);
        this.current = next;
    }

    public moveNext() {
        if (this.current.children.length != 0) {
            this.current = this.current.children[0];
        }
    }

    public moveBack() {
        if (this.current.parent != null) {
            this.current = this.current.parent;
        }
    }

    public moveTo(fenNode: FenNode) {
        this.current = fenNode;
    }

    public getCurrent(): FenNode {
        return this.current;
    }
}

export type FenNode = {
    fen: string
    move: string | null
    parent: FenNode | null
    children: FenNode[]
}