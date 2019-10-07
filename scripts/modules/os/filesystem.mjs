// Defines RWX permission values
const PermissionOption = Object.freeze({
  INHERIT: -1,    // use permission value of parent
  DISALLOWED: 0,  // do not allow access to this function
  ALLOWED: 1      // allow access to this function
});

// Holds RWX permission values -- takes three PermissionOption constants
class Permission {
  constructor(r,w,x) {
    this.read = r;
    this.write = w;
    this.execute = x;
  }
}

// Specifies a filesystem object, aka a File. Anything directly exposed to the
// filesystem will be an instance of this object.
// Permissions should be a Map of User:Permission pairs. Anonymous and User
// should be valid keys, and Root shouldn't be.
class File {
  constructor(filename, permissions) {
    this.parent = null;
    this.filename = filename; // last slash-delimited token
    this.permissions = permissions;
  }
}

// Specifies a directory, which holds other files.
class Directory extends File {
  constructor(filename, permissions) {
    super(filename, permissions);
    this.children = new Map();
  }
  
  addFile(file) {
    file.parent = this;
    this.children.set(file.filename, file);
  }
  
  removeFile(file) {
    this.children.delete(file.filename);
  }
}

// Specifies an executable file, which can be invoked to execute a function.
// The function itself is stored as the program property.
class Executable extends File {
  constructor(filename, permissions, program) {
    super(path, permissions);
    this.program = program;
  }
  
  run(argumentString) {
    return this.program(argumentString);
  }
}

// Specifies a text file, which contains text that can be viewed and changed.
class TextFile extends File {
  constructor(path, permissions, text) {
    super(path, permissions);
    this.text = text;
  }
}


export {
  PermissionOption,
  Permission,
  File,
  Directory,
  Executable,
  TextFile
};