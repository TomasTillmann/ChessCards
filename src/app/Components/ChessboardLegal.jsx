'use client'

import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useState} from "react";


export const ChessboardLegal = ({ position }) => {
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
        console.log("one line above move");
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
            <h1>ChessBoardLegal</h1>
            <div style={{ display: "flex", justifyContent: "space-between", width: "30%", height: "30%" }}>
                <Chessboard
                    position={fen}
                    onPieceDrop={onDrop}
                />
            </div>
        </>
    );
}
