'use client'

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
