'use client'

import useSWR from 'swr'
import { ChessboardLegal } from "@/app/Components/ChessboardLegal";

// @ts-expect-error
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function PuzzleComponent({ params }: { params: { puzzleId: string } })
{
    const { puzzleId } = params;
    const { data, error } = useSWR(`http://127.0.0.1:8090/api/collections/puzzles/records/${puzzleId}`, fetcher);

    if (error) {
        throw new Error(`Failed to fetch puzzle with id: {${puzzleId}}`);
    }
    if (!data) return <div>Loading puzzle ...</div>

    const puzzle = data;

    return (
        <ChessboardLegal
            position={puzzle.fen}
        />
    );
}