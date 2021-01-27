let GUI_BACKGROUND_COLOR = LCD_COLOR.WHITE
let FONT_BACKGROUND_COLOR = LCD_COLOR.WHITE
let FONT_FOREGROUND_COLOR = LCD_COLOR.BLACK

//% block="LCD"
//% weight=101 color=#436EEE icon="\uf108"
namespace LCD1IN8{
    function Swop_AB(Point1: number, Point2: number): void {
        let Temp = 0;
        Temp = Point1;
        Point1 = Point2;
        Point2 = Temp;
    }

    //% blockId=LCD_Init
    //% block="LCD init"
    //% shim=LCD1IN8::LCD_Init
    //% weight=200
    export function LCD_Init(): void {
        return;
    }

    //% blockId=LCD_Clear
    //% block="clear screen"
    //% shim=LCD1IN8::LCD_Clear
    //% weight=195
    export function LCD_Clear(): void {
        return;
    }

    //% blockId=LCD_Filling
    //% block="filling color %Color"
    //% shim=LCD1IN8::LCD_Filling
    //% weight=189
    //% Color.defl=LCD_COLOR.RED
    export function LCD_Filling(Color: number): void {
        return;
    }

    //% blockId=LCD_Display
    //% block="display screen"
    //% shim=LCD1IN8::LCD_Display
    //% weight=194
    export function LCD_Display(): void {
        return;
    }

    //% blockId=LCD_DisplayWindows
    //% block="display window |x1 %Xstart|y1 %Ystart|x2 %Xend|y2 %Yend "
    //% shim=LCD1IN8::LCD_DisplayWindows
    //% Xstart.min=1 Xstart.max=160 Ystart.min=1 Ystart.max=128
    //% Xend.min=1 Xend.max=160 Yend.min=1 Yend.max=128
    //% inlineInputMode=inline
    //% weight=190
    export function LCD_DisplayWindows(Xstart: number, Ystart: number, Xend: number, Yend: number): void {
        return;
    }

    //% blockId=Get_Color
    //% block="%Color"
    //% weight=185
    export function Get_Color(Color: LCD_COLOR): number {
        return Color;
    }

    //% blockId=LCD_SetBL
    //% block="set back light level %Lev"
    //% Lev.min=0 Lev.max=10
    //% shim=LCD1IN8::LCD_SetBL
    //% weight=180
    //% Lev.defl=5
    export function LCD_SetBL(Lev: number): void {
        return;
    }

    //% blockId=DrawPoint
    //% block="draw point at x %x y %y with color %Color size %Dot"
    //% x.min=1 x.max=160 y.min=1 y.max=128
    //% Color.min=0 Color.max=65535
    //% shim=LCD1IN8::DrawPoint
    //% weight=150
    //% inlineInputMode=inline
    //% Color.defl=LCD_COLOR.BLACK
    export function DrawPoint(x: number, y: number, Color: number, Dot: DOT_PIXEL): void {
        return;
    }

    //% blockId=DrawLine
    //% block="draw line at x1 %Xstart y1 %Ystart x2 %Xend y2 %Yend with color %Color| width %Line_width| style %Line_Style"
    //% Xstart.min=1 Xstart.max=160 Ystart.min=1 Ystart.max=128
    //% Xend.min=1 Xend.max=160 Yend.min=1 Yend.max=128
    //% Color.min=0 Color.max=65535
    //% weight=140
    //% inlineInputMode=inline
    //% Color.defl=LCD_COLOR.BLACK
    export function DrawLine(Xstart: number, Ystart: number, Xend: number, Yend: number, Color: number, Line_width: DOT_PIXEL, Line_Style: LINE_STYLE): void {
        if (Xstart > Xend)
            Swop_AB(Xstart, Xend);
        if (Ystart > Yend)
            Swop_AB(Ystart, Yend);

        let Xpoint = Xstart;
        let Ypoint = Ystart;
        let dx = Xend - Xstart >= 0 ? Xend - Xstart : Xstart - Xend;
        let dy = Yend - Ystart <= 0 ? Yend - Ystart : Ystart - Yend;

        // Increment direction, 1 is positive, -1 is counter;
        let XAddway = Xstart < Xend ? 1 : -1;
        let YAddway = Ystart < Yend ? 1 : -1;

        //Cumulative error
        let Esp = dx + dy;
        let Line_Style_Temp = 0;

        for (; ;) {
            Line_Style_Temp++;
            //Painted dotted line, 2 point is really virtual
            if (Line_Style == LINE_STYLE.LINE_DOTTED && Line_Style_Temp % 3 == 0) {
                DrawPoint(Xpoint, Ypoint, GUI_BACKGROUND_COLOR, Line_width);
                Line_Style_Temp = 0;
            } else {
                DrawPoint(Xpoint, Ypoint, Color, Line_width);
            }
            if (2 * Esp >= dy) {
                if (Xpoint == Xend) break;
                Esp += dy
                Xpoint += XAddway;
            }
            if (2 * Esp <= dx) {
                if (Ypoint == Yend) break;
                Esp += dx;
                Ypoint += YAddway;
            }
        }
    }


    //% blockId=DrawRectangle
    //% block="draw rectangle at x1 %Xstart2 y1 %Ystart2 x2 %Xend2 y2 %Yend2 with color %Color fill %Filled width %Dot_Pixel"
    //% Xstart2.min=1 Xstart2.max=160 Ystart2.min=1 Ystart2.max=128
    //% Xend2.min=1 Xend2.max=160 Yend2.min=1 Yend2.max=128
    //% Color.min=0 Color.max=65535
    //% weight=130
    //% inlineInputMode=inline
    //% Color.defl=LCD_COLOR.BLACK
    export function DrawRectangle(Xstart2: number, Ystart2: number, Xend2: number, Yend2: number, Color: number, Filled: DRAW_FILL, Dot_Pixel: DOT_PIXEL): void {
        if (Xstart2 > Xend2)
            Swop_AB(Xstart2, Xend2);
        if (Ystart2 > Yend2)
            Swop_AB(Ystart2, Yend2);

        let Ypoint = 0;
        if (Filled) {
            for(Ypoint = Ystart2; Ypoint < Yend2; Ypoint++) {
                DrawLine(Xstart2, Ypoint, Xend2, Ypoint, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
            }
        } else {
            DrawLine(Xstart2, Ystart2, Xend2, Ystart2, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
            DrawLine(Xstart2, Ystart2, Xstart2, Yend2, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
            DrawLine(Xend2, Yend2, Xend2, Ystart2, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
            DrawLine(Xend2, Yend2, Xstart2, Yend2, Color, Dot_Pixel, LINE_STYLE.LINE_SOLID);
        }
    }

    //% blockId=DrawCircle
    //% block="draw circle at x %X_Center y %Y_Center with r %Radius|color %Color|fill %Draw_Fill| width %Dot_Pixel"
    //% X_Center.min=1 X_Center.max=160 Y_Center.min=1 Y_Center.max=128
    //% Radius.min=0 Radius.max=160
    //% Color.min=0 Color.max=65535
    //% weight=120
    //% inlineInputMode=inline
    //% Color.defl=LCD_COLOR.BLACK
    export function DrawCircle(X_Center: number, Y_Center: number, Radius: number, Color: number, Draw_Fill: DRAW_FILL, Dot_Pixel: DOT_PIXEL): void {
        //Draw a circle from(0, R) as a starting point
        let XCurrent = 0;
        let YCurrent = Radius;

        //Cumulative error,judge the next point of the logo
        let Esp = 3 - (Radius << 1);

        let sCountY = 0;
        if (Draw_Fill == DRAW_FILL.DRAW_FULL) {//DrawPoint(Xpoint, Ypoint, GUI_BACKGROUND_COLOR, Line_width);
            while (XCurrent <= YCurrent) { //Realistic circles
                for (sCountY = XCurrent; sCountY <= YCurrent; sCountY++) {
                    DrawPoint(X_Center + XCurrent, Y_Center + sCountY, Color, DOT_PIXEL.DOT_PIXEL_1);             //1
                    DrawPoint(X_Center - XCurrent, Y_Center + sCountY, Color, DOT_PIXEL.DOT_PIXEL_1);             //2
                    DrawPoint(X_Center - sCountY, Y_Center + XCurrent, Color, DOT_PIXEL.DOT_PIXEL_1);             //3
                    DrawPoint(X_Center - sCountY, Y_Center - XCurrent, Color, DOT_PIXEL.DOT_PIXEL_1);             //4
                    DrawPoint(X_Center - XCurrent, Y_Center - sCountY, Color, DOT_PIXEL.DOT_PIXEL_1);             //5
                    DrawPoint(X_Center + XCurrent, Y_Center - sCountY, Color, DOT_PIXEL.DOT_PIXEL_1);             //6
                    DrawPoint(X_Center + sCountY, Y_Center - XCurrent, Color, DOT_PIXEL.DOT_PIXEL_1);             //7
                    DrawPoint(X_Center + sCountY, Y_Center + XCurrent, Color, DOT_PIXEL.DOT_PIXEL_1);
                }
                if (Esp < 0)
                    Esp += 4 * XCurrent + 6;
                else {
                    Esp += 10 + 4 * (XCurrent - YCurrent);
                    YCurrent--;
                }
                XCurrent++;
            }
        } else { //Draw a hollow circle
            while (XCurrent <= YCurrent) {
                DrawPoint(X_Center + XCurrent, Y_Center + YCurrent, Color, Dot_Pixel);             //1
                DrawPoint(X_Center - XCurrent, Y_Center + YCurrent, Color, Dot_Pixel);             //2
                DrawPoint(X_Center - YCurrent, Y_Center + XCurrent, Color, Dot_Pixel);             //3
                DrawPoint(X_Center - YCurrent, Y_Center - XCurrent, Color, Dot_Pixel);             //4
                DrawPoint(X_Center - XCurrent, Y_Center - YCurrent, Color, Dot_Pixel);             //5
                DrawPoint(X_Center + XCurrent, Y_Center - YCurrent, Color, Dot_Pixel);             //6
                DrawPoint(X_Center + YCurrent, Y_Center - XCurrent, Color, Dot_Pixel);             //7
                DrawPoint(X_Center + YCurrent, Y_Center + XCurrent, Color, Dot_Pixel);             //0

                if (Esp < 0)
                    Esp += 4 * XCurrent + 6;
                else {
                    Esp += 10 + 4 * (XCurrent - YCurrent);
                    YCurrent--;
                }
                XCurrent++;
            }
        }
    }


    //% shim=LCD1IN8::DisChar_1207
    function DisChar_1207(Xchar: number, Ychar: number, Char_Offset: number, Color: number): void {
        return;
    }

    //% blockId=DisString
    //% block="show string $ch at x $Xchar y $Ychar with color $Color"
    //% Xchar.min=1 Xchar.max=160 Ychar.min=1 Ychar.max=128
    //% Color.min=0 Color.max=65535
    //% weight=100
    //% inlineInputMode=inline
    //% Color.defl=LCD_COLOR.BLACK
    export function DisString(Xchar: number, Ychar: number, ch: string, Color: number): void {
        let Xpoint = Xchar;
        let Ypoint = Ychar;
        let Font_Height = 12;
        let Font_Width = 7;
        let ch_len = ch.length;
        let i = 0;
        for(i = 0; i < ch_len; i++) {
            let ch_asicc =  ch.charCodeAt(i) - 32;//NULL = 32
            let Char_Offset = ch_asicc * Font_Height;
			// let Char_Offset = ch_asicc * Font_Height *(Font_Width/8 +(Font_Width%8?1:0));
			
            if((Xpoint + Font_Width) > 160) {
                Xpoint = Xchar;
                Ypoint += Font_Height;
            }

            // If the Y direction is full, reposition to(Xstart, Ystart)
            if((Ypoint  + Font_Height) > 128) {
                Xpoint = Xchar;
                Ypoint = Ychar;
            }
            DisChar_1207(Xpoint, Ypoint, Char_Offset, Color);

            //The next word of the abscissa increases the font of the broadband
            Xpoint += Font_Width;
        }
    }

    //% blockId=DisNumber
    //% block="show number %num at x %Xnum y %Ynum with color %Color"
    //% Xnum.min=1 Xnum.max=160 Ynum.min=1 Ynum.max=128
    //% Color.min=0 Color.max=65535
    //% weight=100
    //% inlineInputMode=inline
    //% Color.defl=LCD_COLOR.BLACK
    export function DisNumber(Xnum: number, Ynum: number, num: number, Color: number): void {
        let Xpoint = Xnum;
        let Ypoint = Ynum;
        DisString(Xnum, Ynum, num + "", Color);
    }

    export class Bitmap {
        _buf: Buffer
        _rows: number
        _cols: number

        _dot: DOT_PIXEL

        constructor(w: number, h: number, dot: DOT_PIXEL) {
            this._dot = dot

            this._rows = Math.floor(h / dot)
            this._cols = Math.floor(w / dot)

            let numBytes:number = Math.ceil(this._rows * this._cols / 8.0)
            
            this._buf = Buffer.create(numBytes) 
            this._buf.fill(0)
        }

        //% block="fill bitmap $this(bitmap) with $bit"
        //% inlineInputMode=inline
        //% group="Bitmap: Modify"
        //% bit.min=0 bit.max=1
        //% bit.defl=0
        public fill(bit: number) {
            if (bit == 0) {
                this._buf.fill(0)
            } else {
                this._buf.fill(1)
            }
        }

        //% block="$this(bitmap) set value at $x $y to $bit"
        //% inlineInputMode=inline
        //% group="Bitmap: Modify"
        //% x.min=0 x.max=160
        //% y.min=0 y.max=128
        //% bit.min=0 bit.max=1
        //% bit.defl=1
        public setBit(x: number, y:number, bit:number) {
            // circular
            x = x % this._cols
            y = y % this._rows  

            let pos = (y * this._cols) + x
            let byteOffset = Math.floor(pos / 8)
            let bitOffset = pos % 8

            let byte = this._buf.getNumber(NumberFormat.UInt8LE, byteOffset)

            if ( bit == 0) {
                byte = byte & ~(1 << bitOffset)
            } else {
                byte = byte | (1 << bitOffset)
            }

            this._buf.setNumber(NumberFormat.UInt8LE, byteOffset, byte);
        }

        //% block="$this(bitmap) get value at $x $y"
        //% inlineInputMode=inline
        //% group="Bitmap: Read"
        public getBit(x: number, y:number): number {
            // circular
            x = x % this._cols
            y = y % this._rows 

            let pos2 = (y * this._cols) + x
            let byteOffset2 = Math.floor(pos2 / 8)
            let bitOffset2 = pos2 % 8

            let byte2 = this._buf.getNumber(NumberFormat.UInt8LE, byteOffset2)

            return (byte2 >> bitOffset2) & 1
        }

        //% block="$this(bitmap) number of rows"
        //% group="Bitmap: Read"
        public getRows() {
            return this._rows
        }

        //% block="$this(bitmap) number of cols"
        //% group="Bitmap: Read"
        public getCols() {
            return this._cols
        }

        //% block="show bitmap $this(bitmap) on leds"
        //% inlineInputMode=inline
        //% group="Bitmap: Display"
        public showBitmapOnLeds() {
            basic.clearScreen()

            for (let y = 0; y < 5; y++) {
                for(let x = 0; x < 5; x++){
                    let bit = this.getBit(x, y)
                    if (bit != 0){
                        led.plot(x, y)
                    }
                }
            }
        }

        //% block="draw $this(bitmap) at x $xi y $yi with color $fgColor and background $bgColor"
        //% inlineInputMode=inline
        //% group="Bitmap: Display"
        //% xi.defl = 0
        //% xi.min=0 xi.max=160
        //% yi.min=0 yi.max=128
        //% yi.defl = 0
        //% fgColor.defl=LCD_COLOR.RED
        //% fgColor.min=0 fgColor.max=65535
        //% bgColor.defl=LCD_COLOR.WHITE
        //% bgColor.min=-1 bgColor.max=65535
        public showBitmapOnLCD(xi:number = 0, yi:number = 0, fgColor: number = LCD_COLOR.RED, bgColor: number = LCD_COLOR.WHITE) {
            for (let y = 0; y < this.getRows(); y++) {
                for(let x = 0; x < this.getCols(); x++){
                    let bit = this.getBit(x, y)
                    if (bit != 0){
                        DrawPoint( xi + (x + 1) * this._dot, yi + (y + 1) * this._dot, fgColor, this._dot)
                    } else if (bgColor != LCD_COLOR.TRANSPARENT) {
                        DrawPoint( xi + (x + 1) * this._dot, yi + (y + 1) * this._dot, bgColor, this._dot)
                    }
                }
            }
        } 
    }

    //% block="create bitmap with width %w heigth %h and pixel size %dot"
    //% w.defl = 160
    //% w.min=1 w.max=160
    //% h.defl = 128
    //% h.min=1 h.max=128
    //% dot.defl=DOT_PIXEL.DOT_PIXEL_4
    //% group="Bitmap: Create"
    //% blockSetVariable=bitmap
    export function createBitmap(w: number = 160, h: number = 128, dot: DOT_PIXEL = DOT_PIXEL.DOT_PIXEL_4): Bitmap {
        return new Bitmap(w, h, dot)
    }
}


