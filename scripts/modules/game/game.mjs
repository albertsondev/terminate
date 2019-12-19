// Ready for a monolith?

// Kehehe.

import machineSetup from '../../../config/machines.mjs';
import ProcessList from '../os/processes.mjs';
import themes from '../../../config/themes.mjs';
import Terminal from '../io/output.mjs';
import backgroundMusic from '../../../config/tracks.mjs';
import {TextFile, Permission, PermissionOption, resolvePath} from '../os/filesystem.mjs';
import {ANONYMOUS} from '../os/users.mjs';

// This object holds the game's global state.
class Game {
  constructor (enableVerboseLogging) {
    // Verbose Logging: prints extra data to the console for debugging purposes
    this.verboseLogging = (enableVerboseLogging === true); // force bool true; false otherwise
    
    // UX stuff
    this.overlay = document.getElementById('terminal-overlay');
    this.themes = themes;
    this.music = backgroundMusic;
    
    this.theme = 'ambient';
    
    // Set initial state variables
    this.activeDirectory;     // Directory object
    this.activeMachine;       // Machine object
    this.commandHistory;      // String[]
    this.commandHistoryIndex; // Int
    this.internet;            // Internet object
    this.localhost;           // Machine object
    this.hardlineActive;      // Boolean
    this.processes;           // ProcessList
    
    // Initialize the game's command history, which will hold user inputs
    this.commandHistory = [];
    this.commandHistoryIndex = -1;
    
    // Initialize the game's process list, which holds running processes
    this.processes = new ProcessList();
    
    // Don't start in hardline.
    this.hardlineActive = false;
    
    // Initialize the game's Internet object, which will hold its machines
    this.internet = machineSetup(this);
    
    // Marks the new machine as the user's.
    this.localhost = this.internet.get('127.0.0.1');
    
    // Initializes the user as the machine's admin and sets their directory to
    // the machine's root folder.
    this.localhost.login(this, 'root', '');
    this.activeMachine = this.localhost;
    this.activeDirectory = this.localhost.root;
  }

  set theme(value) {
    this.themes.setTheme(value);
  }
  
  win () {
    Terminal.warn("Win!");
  }
  
  lose () {
    Terminal.warn("Lose!");
  }
  
  sendMail (name, text) {
    resolvePath(this, '/home/mail', true, this.localhost, this.localhost.root)
      .addFile(
        new TextFile(
          `${name}.mail`,
          new Map().set(ANONYMOUS, new Permission(
            PermissionOption.DISALLOWED,
            PermissionOption.DISALLOWED,
            PermissionOption.DISALLOWED,
          )),
          text
        )
      )
    ;
    
    Terminal.warn('You have new mail.');
  }
}

export default Game;
