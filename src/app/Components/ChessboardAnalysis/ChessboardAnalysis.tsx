'use client'

import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useEffect, useState} from "react";
import {Button, Grid} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {GameTree, FenNode} from "@/app/Components/ChessboardAnalysis/GameTree";
import {Variations} from "@/app/Components/Variations/Variations";

type Move = {
    from: string
    to: string
    promotion: string
}

type ChessboardAnalysisProps = {
    position: string
}

export const ChessboardAnalysis: React.FC<ChessboardAnalysisProps> = ({ position }) => {
    // Arrow key handler
    const movePiecesByArrows = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                onMoveBack();
                break;
            case 'ArrowRight':
                onMoveForward();
                break;
        }
    };

    const onMoveBack = () => {
        fensTree.moveBack();
        setFensTree(fensTree);
        const fenNode : FenNode = fensTree.getCurrent();
        game.load(fenNode.fen);
        setGame(game);
        // console.log(new Chess(fenNode.fen).ascii());
        setFen(fenNode.fen);
    }

    const onMoveForward = () => {
        fensTree.moveNext();
        setFensTree(fensTree);
        const fenNode : FenNode = fensTree.getCurrent();
        game.load(fenNode.fen);
        setGame(game);
        setFen(fenNode.fen);
        // console.log(new Chess(fenNode.fen).ascii());
        setFen(fenNode.fen);
    }

    useEffect(() => {
        window.addEventListener('keydown', movePiecesByArrows);
        return () => {
            window.removeEventListener('keydown', movePiecesByArrows);
        };
    }, []);
    //

    // currently shown position on the Chessboard, represented as FEN
    const [fen, setFen] = useState(position);

    // chess game, to validate legal moves etc ...
    const [game, setGame] = useState(new Chess(position));

    // tree of variations, each node is a fen and a move which was made from previous position (parent) to obtain it
    const [fensTree, setFensTree] = useState(new GameTree(fen));

    // When piece is dropped on the board
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
        if (lastMove == undefined) {
            throw new Error("Panick! lastMove is undefined, but this cannot happen, since at least this move had to be made!");
        }

        fensTree.addFen(game.fen(), lastMove);
        setFensTree(fensTree);
        // console.log(new Chess(game.fen()).ascii());
        return true;
    }

    // makes a move on the chessboard, also updates the board
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
        <div
            id="chessboard_with_notation"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
            }}
        >
            <div id="chessboard" style={{gridColumn:"1/2"}}>
                <Chessboard
                    position={fen}
                    onPieceDrop={onDrop}
                    animationDuration={0}
                />
                <Button onClick={onMoveBack}>
                    <ArrowBackIosIcon/>
                </Button>
                <Button onClick={onMoveForward}>
                    <ArrowForwardIosIcon/>
                </Button>
            </div>
            <div id="notation" style={{gridColumn:"2/2"}}>
                <Variations gameTree={fensTree}/>
            </div>
        </div>
    );
}
