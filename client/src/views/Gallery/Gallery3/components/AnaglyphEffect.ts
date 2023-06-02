import p5Types from 'p5';
// Logic credit:
// https://github.com/mrdoob/three.js/blob/d091564e0279adb607f9a2867fdd9f6dbfe10b2e/examples/jsm/effects/AnaglyphEffect.js
// https://github.com/hx2A/Camera3D



class AnaglyphEffect {

    width: number;
    height: number;
    swapLeftRight: number;
    divergence: number;
    adjustTargetFactor: number;
    useAsymmetricFrustum: boolean;
    cameraDivergenceX: number;
    cameraDivergenceY: number;
    cameraDivergenceZ: number;
    frustrumSkew: number;

    RAD_TO_DEG: number;
    LEFT_IMG: number;
    RIGHT_IMG: number;
    shaderLoaded: boolean;
    fc: number;

    config: {
        cameraPositionX: number,
        cameraPositionY: number,
        cameraPositionZ: number,
        cameraTargetX: number,
        cameraTargetY: number,
        cameraTargetZ: number,
        cameraUpX: number,
        cameraUpY: number,
        cameraUpZ: number,
        frustumLeft:number,
        frustumRight: number,
        frustumBottom: number,
        frustumTop: number,
        frustumNear: number,
        frustumFar: number,
        fovy: number,
    };
    

    imgLeft: p5Types.Graphics;
    imgRight: p5Types.Graphics;
    output: p5Types.Graphics;
    theShader: p5Types.Shader | undefined;

    pInst: p5Types;

    constructor(w: number, h: number, p5: p5Types) {
        // TODO
        // the original library (camera3D) had divergence + swapLeftRight at 1 
        // but the terrain example makes it look like left / right are 
        // backwards w/ red over left eye... ???
        this.divergence = 1;
        this.swapLeftRight = -1;
        this.adjustTargetFactor = 1;
        this.useAsymmetricFrustum = true;
        this.cameraDivergenceX = 0;
        this.cameraDivergenceY = 0;
        this.cameraDivergenceZ = 0;
        this.frustrumSkew = 0;

        this.width = w;
        this.height = h;

        this.RAD_TO_DEG = 57.2957795130823208767981548;
        this.LEFT_IMG = 0;
        this.RIGHT_IMG = 1;
        this.shaderLoaded = false;
        this.fc = -1;

        this.pInst = p5;

        this.imgLeft = this.pInst.createGraphics(w, h, this.pInst.WEBGL);
        this.imgRight = this.pInst.createGraphics(w, h, this.pInst.WEBGL);
        this.output = this.pInst.createGraphics(w, h, this.pInst.WEBGL);

        this.config = {
            cameraPositionX: 0,
            cameraPositionY: 0,
            cameraPositionZ: 0,
            cameraTargetX: 0,
            cameraTargetY: 0,
            cameraTargetZ: 0,
            cameraUpX: 0,
            cameraUpY: 1,
            cameraUpZ: 0,
            frustumLeft:0,
            frustumRight: 0,
            frustumBottom: 0,
            frustumTop: 0,
            frustumNear: 0,
            frustumFar: 0,
            fovy: 0,
        };

        if (this.pInst.frameCount != this.fc) {
            this.fc = this.pInst.frameCount;

            const vert = '#ifdef GL_ES \n' +
                'precision mediump float; \n' +
                '#endif \n' +
                'attribute vec3 aPosition;' +
                'attribute vec2 aTexCoord;' +
                'varying vec2 vTexCoord;' +
                'void main() {' +
                'vTexCoord = aTexCoord;' +
                'vec4 positionVec4 = vec4(aPosition, 1.0);' +
                'positionVec4.xy = positionVec4.xy * 2.0 - 1.0;' +
                'gl_Position = positionVec4;' +
                '}'

            const frag = '#ifdef GL_ES \n' +
                'precision mediump float; \n' +
                '#endif \n' +
                'varying vec2 vTexCoord;' +
                'uniform vec2 u_resolution;' +
                'uniform sampler2D mapLeft;' +
                'uniform sampler2D mapRight;' +

                'mat3 colorMatrixLeft = mat3(' +
                '0.456100, - 0.0400822, - 0.0152161,' +
                '0.500484, - 0.0378246, - 0.0205971,' +
                '0.176381, - 0.0157589, - 0.00546856' +
                ');' +

                'mat3 colorMatrixRight = mat3(' +
                '- 0.0434706, 0.378476, - 0.0721527,' +
                '- 0.0879388, 0.73364, - 0.112961,' +
                '- 0.00155529, - 0.0184503, 1.2264' +
                ');' +
                'float lin( float c ) {' +
                'return c <= 0.04045 ? c * 0.0773993808 :' +
                'pow( c * 0.9478672986 + 0.0521327014, 2.4 );' +
                '}' +

                'vec4 lin( vec4 c ) {' +
                'return vec4( lin( c.r ), lin( c.g ), lin( c.b ), c.a );' +
                '}' +

                'float dev( float c ) {' +
                'return c <= 0.0031308 ? c * 12.92' +
                ': pow( c, 0.41666 ) * 1.055 - 0.055;' +
                '}' +

                'void main() {' +
                'vec2 uv = vTexCoord;' +
                'vec4 colorL = lin( texture2D( mapLeft, uv ) );' +
                'vec4 colorR = lin( texture2D( mapRight, uv ) );' +

                'vec3 color = clamp(' +
                'colorMatrixLeft * colorL.rgb +' +
                'colorMatrixRight * colorR.rgb, 0., 1. );' +

                'gl_FragColor = vec4(' +
                'dev( color.r ), dev( color.g ), dev( color.b ),' +
                'max( colorL.a, colorR.a ) );' +
                '}';



            this.config = {
                cameraPositionX: 0,
                cameraPositionY: 0,
                cameraPositionZ: this.height / 2 / this.pInst.tan(this.pInst.PI / 6),
                cameraTargetX: 0,
                cameraTargetY: 0,
                cameraTargetZ: 0,
                cameraUpX: 0,
                cameraUpY: 1,
                cameraUpZ: 0,
                frustumLeft: -this.width / 2,
                frustumRight: this.width / 2,
                frustumBottom: -this.height / 2,
                frustumTop: this.height / 2,
                frustumNear: 0,
                frustumFar: this.pInst.max(this.width, this.height),
                fovy: this.pInst.PI / 3,
            };



            this.recalculateCameraSettings();


            this.theShader = this.output.createShader(vert, frag);
            this.shaderLoaded = true;

            // TODO - I don't think the anaglyph matrices are setup to handle
            // alpha channel - effect ruined if background is cleared
            // this.imgLeft.setAttributes('alpha', true);
            // this.imgRight.setAttributes('alpha', true);
            // this.output.setAttributes('alpha', true);
        }
    }


    draw(scene: (pg: p5Types.Graphics) => void) {
        if (this.theShader && this.shaderLoaded) {
            this.drawScene(this.LEFT_IMG, this.imgLeft, scene);
            this.drawScene(this.RIGHT_IMG, this.imgRight, scene);

            this.updateShader();
        }
        else {
            this.drawScene(this.LEFT_IMG, this.imgLeft, scene);
            this.pInst.image(this.imgLeft, -this.width / 2, -this.height / 2);
        }
    }

    setDivergence(divergence = 1) {
        this.divergence = divergence;
    }

    updateShader() {
        if (this.theShader) {
            this.theShader.setUniform("u_resolution", [this.width, this.height]);
            this.theShader.setUniform("mapLeft", this.imgLeft);
            this.theShader.setUniform("mapRight", this.imgRight);
            this.output.clear();
            this.output.shader(this.theShader);
            this.output.rect(0, 0, this.width, this.height);

            this.pInst.image(this.output, -this.width / 2, -this.height / 2);
        }

    }

    drawStereoImages(left: p5Types.Image, right: p5Types.Image, x = 0, y = 0) {
        if (this.theShader && this.shaderLoaded) {
            this.drawImage(left, this.imgLeft, x, y);
            this.drawImage(right, this.imgRight, x, y);
            this.updateShader();
        }
        else {
            this.drawImage(left, this.imgLeft);
        }
    }

    drawImage(img: p5Types.Image, pg: p5Types.Graphics, x = 0, y = 0) {
        if (img) {
            // in WEBGL mode, origin is at center
            // for some reason shader flips images?
            // have to reverse them in the y
            pg.push();
            pg.clear();
            pg.translate(x, y);
            pg.scale(1, -1);
            pg.image(img, 0, 0);
            pg.pop();
        }

    }

    drawScene(side: number, pg: p5Types.Graphics, scene: (pg: p5Types.Graphics) => void) {
        pg.push();
        pg.clear();
        this.getCamera(side, pg);
        scene(pg);
        pg.pop();
    }


    recalculateCameraSettings() {
        const {cameraPositionX, cameraTargetX} = this.config;
        this.perspective();
        let dx =
            this.adjustTargetFactor * (cameraPositionX - cameraTargetX);

        let dy =
            this.adjustTargetFactor *
            (this.config.cameraPositionY - this.config.cameraTargetY);


        let dz =
            this.adjustTargetFactor *
            (this.config.cameraPositionZ - this.config.cameraTargetZ);
        let diverge =
            -(this.swapLeftRight * this.divergence) / (this.config.fovy * this.RAD_TO_DEG);

        this.cameraDivergenceX =
            (dy * this.config.cameraUpZ - this.config.cameraUpY * dz) * diverge;
        this.cameraDivergenceY =
            (dz * this.config.cameraUpX - this.config.cameraUpZ * dx) * diverge;
        this.cameraDivergenceZ =
            (dx * this.config.cameraUpY - this.config.cameraUpX * dy) * diverge;

        let distanceToTarget = Math.sqrt(dx * dx + dy * dy + dz * dz);
        let cameraDivergenceDistance =
            Math.sign(this.swapLeftRight * this.divergence) *
            Math.sqrt(
                this.cameraDivergenceX * this.cameraDivergenceX +
                this.cameraDivergenceY * this.cameraDivergenceY +
                this.cameraDivergenceZ * this.cameraDivergenceZ
            );
        this.frustrumSkew =
            (cameraDivergenceDistance * this.config.frustumNear) / distanceToTarget;
    }


    getCamera(side: number, pg: p5Types.Graphics) {
        if (this.useAsymmetricFrustum) {
            this.drawAsymmetricFrustrum(side, pg);
        } else {
            this.drawSymmetricFrustrum(side, pg);
        }
    }

    drawAsymmetricFrustrum(side: number, pg: any) {
        if (side == this.LEFT_IMG) {
            pg.camera(
                this.config.cameraPositionX + this.cameraDivergenceX,
                this.config.cameraPositionY + this.cameraDivergenceY,
                this.config.cameraPositionZ + this.cameraDivergenceZ,
                this.config.cameraTargetX + this.cameraDivergenceX,
                this.config.cameraTargetY + this.cameraDivergenceY,
                this.config.cameraTargetZ + this.cameraDivergenceZ,
                this.config.cameraUpX,
                this.config.cameraUpY,
                this.config.cameraUpZ
            );

            pg.frustum(
                this.config.frustumLeft - this.frustrumSkew,
                this.config.frustumRight - this.frustrumSkew,
                this.config.frustumBottom,
                this.config.frustumTop,
                this.config.frustumNear,
                this.config.frustumFar
            );
        } else if (side == this.RIGHT_IMG) {
            pg.camera(
                this.config.cameraPositionX - this.cameraDivergenceX,
                this.config.cameraPositionY - this.cameraDivergenceY,
                this.config.cameraPositionZ - this.cameraDivergenceZ,
                this.config.cameraTargetX - this.cameraDivergenceX,
                this.config.cameraTargetY - this.cameraDivergenceY,
                this.config.cameraTargetZ - this.cameraDivergenceZ,
                this.config.cameraUpX,
                this.config.cameraUpY,
                this.config.cameraUpZ
            );

            pg.frustum(
                this.config.frustumLeft + this.frustrumSkew,
                this.config.frustumRight + this.frustrumSkew,
                this.config.frustumBottom,
                this.config.frustumTop,
                this.config.frustumNear,
                this.config.frustumFar
            );
        }
    }

    drawSymmetricFrustrum(side: number, pg: p5Types.Graphics) {
        if (side == this.LEFT_IMG) {
            pg.camera(
                this.config.cameraPositionX + this.cameraDivergenceX,
                this.config.cameraPositionY + this.cameraDivergenceY,
                this.config.cameraPositionZ + this.cameraDivergenceZ,
                this.config.cameraTargetX,
                this.config.cameraTargetY,
                this.config.cameraTargetZ,
                this.config.cameraUpX,
                this.config.cameraUpY,
                this.config.cameraUpZ
            );
        } else if (side == this.RIGHT_IMG) {
            pg.camera(
                this.config.cameraPositionX - this.cameraDivergenceX,
                this.config.cameraPositionY - this.cameraDivergenceY,
                this.config.cameraPositionZ - this.cameraDivergenceZ,
                this.config.cameraTargetX,
                this.config.cameraTargetY,
                this.config.cameraTargetZ,
                this.config.cameraUpX,
                this.config.cameraUpY,
                this.config.cameraUpZ
            );
        }
    }

    perspective() {
        let cameraZ = this.height / 2 / Math.tan((this.pInst.PI * 60.0) / 360.0);
        let fovy = this.pInst.PI / 3;
        let aspect = this.width / this.height;
        let zNear = cameraZ / 10;
        let zFar = cameraZ * 10;
        let ymax = zNear * Math.tan(fovy / 2);
        let ymin = -ymax;
        let xmin = ymin * aspect;
        let xmax = ymax * aspect;
        this.frustum(xmin, xmax, ymin, ymax, zNear, zFar);
    }

    frustum(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        this.config.frustumLeft = left;
        this.config.frustumRight = right;
        this.config.frustumBottom = bottom;
        this.config.frustumTop = top;
        this.config.frustumNear = near;
        this.config.frustumFar = far;
        this.config.fovy = 2 * Math.atan(top / near);
    }

    resize() {
        this.recalculateCameraSettings();
    }

}

export default AnaglyphEffect;