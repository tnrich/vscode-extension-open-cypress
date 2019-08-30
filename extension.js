// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vscode-extension-open-cypress" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.runCypress", function() {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      const terminal = vscode.window.createTerminal("runCypress");
      var currentlyOpenTabfilePath =
        vscode.window.activeTextEditor.document.fileName;

      //  var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
      // const editor = vscode.window.activeTextEditor; var selection = editor.selection;
      // var text = editor.document.getText(selection);

      terminal.show();
      terminal.sendText(
        `./node_modules/.bin/cypress open open --config testFiles=${currentlyOpenTabfilePath}`
      );
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.runCypressOnly", function() {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      const terminal = vscode.window.createTerminal("runCypress");
      const editor = vscode.window.activeTextEditor;
      var currentlyOpenTabfilePath = editor.document.fileName;

      // const line = ;
      // line.range.start.character
      // line.range.start.character
      const line = editor.document.lineAt(editor.selection.active.line);

      var text = editor.document.getText(line.range);
      if (!text.includes("it.only(")) {
        const indexOfIt = text.indexOf("it(");
        if (indexOfIt !== -1) {
          editor.edit(editBuilder => {
            //editor is an object of active text editor

            editBuilder.replace(
              new vscode.Position(
                editor.selection.active.line,
                indexOfIt + 2
              ),
              ".only"
            ); // text = 'dummydummydummy'
          }).then(() => {
						editor.document.save()
					})
        }
      }

      //  var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
      // const editor = vscode.window.activeTextEditor; var selection = editor.selection;
      // var text = editor.document.getText(selection);

      terminal.show();
      terminal.sendText(
        `./node_modules/.bin/cypress open open --config testFiles=${currentlyOpenTabfilePath}`
      );
    })
  );
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
