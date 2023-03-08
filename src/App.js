import React, { Component, useEffect, useRef, useState } from "react";
import "./App.css";
import Watermark from "./whatherMark";

import logoImg from "./logo512.png";
import { Canvas } from "./canvas";
import { CanvasV2 } from "./canvasv2";
function App() {
    const [dimensions, setDimensions] = useState({ width: null, height: null });
    const [watermark, setWatermark] = useState("");
    const [canvasParams, setCanvasParams] = useState({
        src: "http://www.w3schools.com/css/img_fjords.jpg",
        newX: "0",
        newY: "100",
        newWidth: "200",
        newHeight: "300",
    });
    const [result, setResult] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        if (imageRef.current) {
            setDimensions({
                width: imageRef.current.clientHeight || 200,
                height: imageRef.current.clientWidth || 300,
            });
        }
    }, [imageRef]);

    const hideShowWatterMark = () => {
        if (watermark) {
            setWatermark("");
        } else {
            setWatermark("Simplo");
        }
    };

    // Event handler callback for zoom in
    function handleZoomIn() {
        // Fetching current height and width
        const height = imageRef.current.clientHeight;
        const width = imageRef.current.clientWidth;

        // Increase dimension(Zooming)
        setDimensions({
            height: height + 10,
            width: width + 10,
        });
    }

    // Event handler callback zoom out
    function handleZoomOut() {
        // Assigning original height and width
        const height = imageRef.current.clientHeight;
        const width = imageRef.current.clientWidth;
        setDimensions({
            height: height - 10,
            width: width - 10,
        });
    }

    function cropImage(downloadName, newX, newY, newWidth, newHeight) {
        const originalImage = new Image();
        originalImage.src = "http://www.w3schools.com/css/img_fjords.jpg";
        originalImage.crossOrigin = "anonymous";
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");

        originalImage.onload = function () {
            //set the canvas size to the new width and height
            const pixelRatio = window.devicePixelRatio;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            canvas.width = newWidth;
            canvas.height = newHeight;
            console.log(originalImage, canvas);
            //draw the image
            ctx.drawImage(
                originalImage,
                newX,
                newY,
                newWidth,
                newHeight,
                0,
                0,
                newWidth,
                newHeight
            );
        };

        // downloadImage(downloadName);
    }

    const handleCropImage = (src, newX, newY, newWidth, newHeight) => {
        setCanvasParams({ src, newX, newY, newWidth, newHeight });
        setResult((prev) => !prev);
    };

    const imgStyle = { height: dimensions.height, width: dimensions.width };
    return (
        <div>
            <h1> teste zoom</h1>
            <div
                style={{
                    overflow: "auto",
                    backgroundColor: "red",
                    width: "600px",
                    height: "300px",
                }}
            >
                <Watermark text={watermark}>
                    <img
                        style={imgStyle}
                        ref={imageRef}
                        src={"http://www.w3schools.com/css/img_fjords.jpg"}
                        alt="test"
                        className="watermarked"
                        data-watermark="watermark.com"
                    />
                </Watermark>
            </div>

            <div>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={hideShowWatterMark}>
                    Hide/show watermark
                </button>
                <button
                    onClick={() => {
                        handleCropImage(logoImg, 150, 100, 400, 100);
                    }}
                >
                    Crop Image
                </button>
            </div>

            {result && (
                <CanvasV2
                    imageSrc={canvasParams.src}
                    newX={canvasParams.newX}
                    newY={canvasParams.newY}
                    newWidth={canvasParams.newWidth}
                    newHeight={canvasParams.newHeight}
                />
            )}
        </div>
    );
}
export default App;
