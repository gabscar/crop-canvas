import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

export const CanvasV2 = ({ imageSrc, newX, newY, newWidth, newHeight }) => {
    const canvaRef = useRef(null);
    const canvasDivRef = useRef(null);
    const imageToPrint = useRef(null);
    const [imageUrl, setImageUrl] = useState("");
    const [showPrintImage, setShowPrintImage] = useState(false);
    useEffect(() => {
        const canvas = canvaRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;
        img.onload = () => {
            ctx.drawImage(
                img,
                newX,
                newY,
                newWidth,
                newHeight,
                0,
                0,
                newWidth,
                newHeight
            );

            // ctx.font = "40px Courier";
            // ctx.fillStyle = "black";
            // ctx.fillText("teste", 10, 180);
            setImageUrl(
                document.getElementById("canvas").toDataURL("image/jpeg")
            );
        };
    }, [imageSrc, newX, newY, newWidth, newHeight, showPrintImage]);

    function downloadImage(downloadName) {
        console.log(
            "entrou",
            document.getElementById("canvas").toDataURL("image/jpeg")
        );
        let tempLink = document.createElement("a");
        tempLink.download = downloadName;
        tempLink.href = document
            .getElementById("canvas")
            .toDataURL("image/jpeg");
        tempLink.click();
    }
    const onBeforeGetContentResolve = React.useRef(null);

    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState("old boring text");

    const handleAfterPrint = React.useCallback(() => {
        setShowPrintImage(false);
    }, [showPrintImage]);

    const handleBeforePrint = React.useCallback(() => {
        setShowPrintImage(false);
    }, [showPrintImage]);

    const handleOnBeforeGetContent = React.useCallback(() => {
        setShowPrintImage(true);

        setLoading(true);
        setText("Loading new text...");

        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText("New, Updated Text!");
                resolve();
            }, 2000);
        });
    }, [setLoading, setText, setShowPrintImage, showPrintImage]);

    useEffect(() => {
        if (
            text === "New, Updated Text!" &&
            typeof onBeforeGetContentResolve.current === "function"
        ) {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, text, showPrintImage]);

    const reactToPrintContent = React.useCallback(() => {
        if (showPrintImage) return imageToPrint.current;
    }, [imageToPrint, showPrintImage]);

    const reactToPrintTrigger = React.useCallback(() => {
        return <button>Print using a Functional Component</button>;
    }, []);

    return (
        <div ref={canvasDivRef}>
            {!showPrintImage && (
                <canvas
                    id="canvas"
                    ref={canvaRef}
                    width={newWidth}
                    height={newHeight}
                />
            )}

            {showPrintImage && <img src={imageUrl} ref={imageToPrint} />}

            <button
                onClick={() => {
                    downloadImage("teste");
                }}
            >
                Download
            </button>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="AwesomeFileName"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
        </div>
    );
};
