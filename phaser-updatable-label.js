/**
 * Created by flogvit on 2015-11-12.
 *
 * @copyright Cellar Labs AS, 2015, www.cellarlabs.com, all rights reserved
 * @file
 * @license MIT
 * @author Vegard Hanssen <Vegard.Hanssen@cellarlabs.com>
 *
 */

var UpdatableLabel = function (game, x, y, value, font, positive) {
    Phaser.Text.call(this, game, x, y, value, font);
    this.label = {};
    this.label.updateFont = {font: '90px Arial', fill: "#39d179", stroke: "#ffffff", strokeThickness: 15};
    this.label.positive = !!positive;
    this.label.value = value;
    this.label.buffer = 0;
    this.label.tmpBuffer = 0;

    this.label.tween = game.add.tween(this.scale).to({
        x: 1.5,
        y: 1.5
    }, 200, Phaser.Easing.Linear.In).to({
        x: 1,
        y: 1
    }, 200, Phaser.Easing.Linear.In);
    this.text = this.label.value;

    game.add.existing(this);
}

UpdatableLabel.prototype = Object.create(Phaser.Text.prototype);
UpdatableLabel.prototype.constructor = UpdatableLabel;

UpdatableLabel.prototype.setUpdateFont = function(font) {
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
        this.label.updateFont.fill = this.label.positive ? "#FF0000" : "#39d179";
    } else {
        this.label.updateFont.fill = this.label.positive ? "#39d179" : "#FF0000";
    }

    var labelAnimation = self.game.add.text(x, y, message, this.label.updateFont);
    labelAnimation.anchor.setTo(0.5, 0);
    labelAnimation.align = 'center';

    var labelTween = self.game.add.tween(labelAnimation).to({
        x: self.position.x,
        y: self.position.y
    }, 800, Phaser.Easing.Exponential.In, true);

    self.label.tmpBuffer += value;

    labelTween.onComplete.add(function () {
        labelAnimation.destroy();
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
