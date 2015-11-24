/**
 * Created by flogvit on 2015-11-12.
 *
 * @copyright Cellar Labs AS, 2015, www.cellarlabs.com, all rights reserved
 * @file
 * @license MIT
 * @author Vegard Hanssen <Vegard.Hanssen@cellarlabs.com>
 *
 */


var UpdatableLabel = function (game, x, y, options) {
    this.label = {};
    this.label.value = 'value' in options ? options.value : 0;
    this.label.font = 'font' in options ? options.font : {
        font: '50px Arial',
        fill: '#00',
        align: 'center'
    };
    this.label.updateFont = 'updateFont' in options ? options.updateFont : {
        font: '90px Arial',
        fill: "#39d179",
        stroke: "#ffffff",
        strokeThickness: 15
    }
    this.label.updateFontFill = this.label.updateFont.fill;
    this.label.positive = 'positive' in options ? !!options.positive : true;
    this.label.labelAnimate = 'labelAnimate' in options ? options.labelAnimate : true;
    this.label.labelAnimateSize = 'labelAnimateSize' in options ? options.labelAnimateSize : 1.5;
    this.label.labelAnimateSpeed = 'labelAnimateSpeed' in options ? options.labelAnimateSpeed : 200;
    this.label.labelAnimateEasing = 'labelAnimateEasing' in options ? options.labelAnimateEasing : Phaser.Easing.Linear.In;

    this.label.updateAnimateSpeed = 'updateAnimateSpeed' in options ? options.updateAnimateSpeed : 800;
    this.label.updateAnimateEasing = 'updateAnimateEasing' in options ? options.updateAnimateEasing : Phaser.Easing.Exponential.In;

    Phaser.Text.call(this, game, x, y, this.label.value, this.label.font);

    this.label.buffer = 0;
    this.label.tmpBuffer = 0;
    this.label.tween = null;

    this.label.tween = !this.label.labelAnimate ? null :
        game.add.tween(this.scale).to({
            x: this.label.labelAnimateSize,
            y: this.label.labelAnimateSize
        }, this.label.labelAnimateSpeed, this.label.labelAnimateEasing).to({
            x: 1,
            y: 1
        }, this.label.labelAnimateSpeed, this.label.labelAnimateEasing);

    this.text = this.label.value;

    game.add.existing(this);
}

UpdatableLabel.prototype = Object.create(Phaser.Text.prototype);
UpdatableLabel.prototype.constructor = UpdatableLabel;

UpdatableLabel.prototype.setUpdateFont = function (font) {
    this.label.updateFont = font;
}

UpdatableLabel.prototype.removeValue = function (value) {
    this.label.value -= value;
    this.text = this.label.value;
}

UpdatableLabel.prototype.update = function () {
    var change = Math.floor(this.label.buffer / 10);
    if (this.label.buffer > 0) {
        if (change < 1) change = 1;
        this.label.value += this.label.buffer >= 1 ? change : this.label.buffer;
        this.label.buffer -= this.label.buffer >= 1 ? change : this.label.buffer;
    } else if (this.label.buffer < 0) {
        if (change > -1) change = -1;
        this.label.value += this.label.buffer <= -1 ? change : this.label.buffer;
        this.label.buffer -= this.label.buffer <= -1 ? change : this.label.buffer;
    }
    this.text = this.label.value;
}

UpdatableLabel.prototype.getValue = function () {
    return this.label.value + this.label.buffer + this.label.tmpBuffer;
}

UpdatableLabel.prototype.addValue = function (value, point) {
    var x = point.x;
    var y = point.y;
    var message = value > 0 ? '+' + value : value;
    var self = this;
    if (value < 0) {
        this.label.updateFont.fill = this.label.positive ? "#FF0000" : this.label.updateFontFill;
    } else {
        this.label.updateFont.fill = this.label.positive ? this.label.updateFontFill : "#FF0000";
    }

    var labelAnimation = self.game.add.text(x, y, message, this.label.updateFont);
    labelAnimation.anchor.setTo(0.5, 0);
    labelAnimation.align = 'center';

    var labelTween = self.game.add.tween(labelAnimation).to({
        x: self.position.x,
        y: self.position.y,
        alpha: 0
    }, self.label.updateAnimateSpeed, self.label.updateAnimateEasing, true);

    self.label.tmpBuffer += value;

    labelTween.onComplete.add(function () {
        labelAnimation.destroy();
        if (self.label.tween != null)
            self.label.tween.start();
        self.label.buffer += value;
        self.label.tmpBuffer -= value;
    }, self);
}

UpdatableLabel.prototype.addMultiplier = function (value, point) {
    this.addValue((this.getValue() * value) - this.getValue(), point);
}

UpdatableLabel.prototype.removeMultiplier = function (value) {
    this.removeValue(this.getValue() - (this.getValue() / value));
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = UpdatableLabel;
    }
}
