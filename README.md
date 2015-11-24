# phaser-updatable-label
An UpdatableLabel type for phaser which will give you animated updates

# Install

## npm

```bash
    npm install phaser-updatable-label
```

## bower

```bash
    bower install phaser-updatable-label
```

# Usage

```javascript
  // If you used browerify. Else just add it in script tag and use class UpdatableLabel.
  var UpdatableLabel = require('phaser-updatable-label');

  // Create the label.
  var label = new UpdatableLabel(this.game, startX, startY);

  // Add a value to the label. We define the start position for the value we add
  // This will start the animation and add the value
  label.addValue(10, {x: 100, y: 100});

  // Get the new value. This is the updated value even though the label is not
  var newValue = label.getValue();

  // We can also add multiplications. If the value was 1 and we add multiplier by 2
  // the new value will be 2
  label.addMultiplier(value, {x: 100, y: 100});

  // And remove it. The module take care of correct number, so you should use
  // the value of 2 if you used 2 in addMultiplier
  label.removeMultiplier(value);

```

# Options
You have some options which will define the look and feel of the label, if you do not like
the standard options. You an add the options when you create the label

```javascript
  var options = {}
  var label = new UpdatableLabel(this.game, startX, startY, options);
```


## Font options
These options are for which fonts will be used

```javascript
  var options = {
     // Define the font for the label
     font: {
              font: '50px Arial',
              fill: '#00',
              align: 'center'
           },
           
     // Define the font for the update
     updateFont: {
              font: '90px Arial',
              fill: "#39d179",
              stroke: "#ffffff",
              strokeThickness: 15
           }
  }
```

## Label options
These options are for the animation of the label

```javascript
  var options = {
    // If the label should be animated when updated
    labelAnimate: true,
    
    // The size the label should be animated to
    labelAnimateSize: 1.5,
    
    // The speed the label should be animated with
    labelAnimateSpeed: 200,
    
    // The easing used for the animation
    labelAnimateEasing: Phaser.Easing.Linear.In
  }
```

## Update options
These options are for the animation of the update

```javascript
  var options = {
     // The speed the update should be animated with
     updateAnimateSpeed: 800,
     
     // The easing used for the animation
     updateAnimateEasing: Phaser.Easing.Exponential.In
  }
```
