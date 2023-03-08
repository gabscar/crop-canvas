import React, { Component } from "react";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.canvasRef = React.createRef();
    }
    componentDidMount() {
        const canvas = this.refs.canvas;
        console.log(canvas);
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = this.props.imageToShow;

        img.onload = () => {
            ctx.drawImage(img, 33, 150, 104, 124, 21, 20, 87, 104);
            ctx.font = "40px Courier";
            ctx.fillStyle = "black";
            ctx.fillText("teste", 10, 180);
        };
    }

    render() {
        const { width, heigth, imageToShow } = this.props;

        return (
            <>
                <div>
                    <h3>Draw Image</h3>
                    <canvas ref="canvas" width={width} height={heigth} />
                </div>
            </>
        );
    }
}
