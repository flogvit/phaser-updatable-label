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

  // Sample style for the label text
  var textStyle = { font: '50px Arial', fill: '#00', align: 'center'};

  // The initial value of the label
  var initValue = 0;

  // Create the label. The true is to set if the label is ment to be positive
  var label = new UpdatableLabel(this.game, startX, startY, initValue, textStyle, true);

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