import { useEffect, useState } from "react";

function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const onMouseMove = (event) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        const rotateCursor = () => {
            setRotation((prevRotation) => prevRotation + 1); // Increment rotation
        };

        window.addEventListener("mousemove", onMouseMove);
        const interval = setInterval(rotateCursor, 16); // Rotate every frame (~60 FPS)

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div
            className="custom-cursor"
            style={{
                left: position.x - 40, // Center cursor
                top: position.y - 40,  // Center cursor
                transform: `rotate(${rotation}deg)`, // Apply rotation
            }}
        />
    );
}

export default Cursor;
