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

export const ChessboardAnalysis: React.FC<ChessboardAnalysisProps> = ({ position }) => {
    const [fen, setFen] = useState(position);
    const [game, setGame] = useState(new Chess(position));

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
            />
            <Button>
                <ArrowBackIosIcon/>
            </Button>
            <Button>
                <ArrowForwardIosIcon/>
            </Button>
        </>
    );
}
