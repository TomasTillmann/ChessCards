'use client'

import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useState} from "react";
import {Button} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Move = {
    from: string
    to: string
    promotion: string
}

type ChessboardAnalysisProps = {
    position: string
}

type FenNode = {
    fen: string
    move: string | null
    parent: FenNode | null
    children: FenNode[]
}

class FensTree {
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

    public getCurrent() : FenNode {
        return this.current;
    }
}

export const ChessboardAnalysis: React.FC<ChessboardAnalysisProps> = ({ position }) => {
    const [fen, setFen] = useState(position);
    const [game, setGame] = useState(new Chess(position));
    const [fensTree, setFensTree] = useState(new FensTree(fen));

    function onDrop (source: string, target: string) {
        const result = makeAMove({
            from: source,
            to: target,
            promotion: "q", //TODO: always promote to a queen
        });

        // illegal move
        if (result == null) {
            return false;
        }

        const lastMove: string | undefined = game.history().at(-1);
        console.log(`lastMove: ${lastMove}`);
        if (lastMove == undefined) {
            throw new Error("Panick! lastMove is undefined, but this cannot happen, since at least this move had to be made!");
        }

        fensTree.addFen(game.fen(), lastMove);
        setFensTree(fensTree);
        console.log(new Chess(game.fen()).ascii());
        return true;
    }

    function makeAMove(move: Move) {
        let result;

        try {
            result = game.move(move);
            setGame(game);
            setFen(game.fen());
        }
        catch { /* supress error */ }

        return result;
    }

    return (
        <>
            <Chessboard
                position={fen}
                onPieceDrop={onDrop}
                animationDuration={0}
            />
            <Button onClick={() => {
                fensTree.moveBack();
                setFensTree(fensTree);
                const fenNode : FenNode = fensTree.getCurrent();
                game.load(fenNode.fen);
                setGame(game);

                console.log(new Chess(fenNode.fen).ascii());

                setFen(fenNode.fen);
            }}>
                <ArrowBackIosIcon/>
            </Button>
            <Button onClick={() => {
                fensTree.moveNext();
                setFensTree(fensTree);
                const fenNode : FenNode = fensTree.getCurrent();
                game.load(fenNode.fen);
                setGame(game);

                console.log(new Chess(fenNode.fen).ascii());

                setFen(fenNode.fen);
            }}>
                <ArrowForwardIosIcon/>
            </Button>
        </>
    );
}
