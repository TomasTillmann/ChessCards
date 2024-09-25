'use server'

import PocketBase from "pocketbase";
import { Puzzle } from "@/app/types/Puzzle";

export default async function PuzzleComponent({ params }: { params: { puzzleId: string } })
{
    const { puzzleId } = params;

    const pb = new PocketBase('http://127.0.0.1:8090');

    const puzzle: Puzzle = await pb.collection('puzzles').getOne(puzzleId);

    return (
        <h1>{puzzle.fen}</h1>
    );
}