// Import the commands from ../scripts/modules/commands here.
import echo from '../scripts/modules/commands/echo.mjs'

// This'll hold all the game's user-executable commands by name.
let commands = (function() {
  let out = new Map();
  
  // Add commands to the command dictionary here.
  out.set('echo', echo);
  
  return out;
})();

export default commands;
