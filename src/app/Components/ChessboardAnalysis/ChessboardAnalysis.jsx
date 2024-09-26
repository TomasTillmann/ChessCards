'use client'

import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useState} from "react";

import ChessAnalysisBoard from 'react-chess-analysis-board'
import './style.scss';

export const ChessboardAnalysis = ({ position }) => {
    return (
        <ChessAnalysisBoard
            config={{
                boardConfig: {
                    fen: position
                }
            }}
        />
    )
}

/// OLD ??
export const ChessboardLegalOld = ({ position }) => {
    const [fen, setFen] = useState(position);
    const [game, setGame] = useState(new Chess(position));

    function onDrop (source, target) {
        const result = makeAMove({
            from: source,
            to: target,
            promotion: "q", //TODO: always promote to a queen for example simplicity
        });

        // illegal move
        if (result == null) {
            return false;
        }

        return true;
    }

    function makeAMove(move) {
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
        <Chessboard
            position={fen}
            onPieceDrop={onDrop}
        />
    );
}
