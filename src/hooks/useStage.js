import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(()=>{
        const updateStage = prevStage => {
            // First flush the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            );

            // Draw the teromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.colided ? 'merged' : 'clear'}`,
                        ]
                    }
                })
            });
            // Check if collided
            if(player.colided) {
                resetPlayer();
            }

            return newStage;
        }

        setStage(prev => updateStage(prev));
    }, [player, resetPlayer]);

    return [stage, setStage];
}