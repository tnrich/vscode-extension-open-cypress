// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function runCypressCommand() {
  
      // Display a message box to the user
      const terminal = vscode.window.createTerminal("runCypress");
      var currentlyOpenTabfilePath =
        vscode.window.activeTextEditor.document.fileName;

      //  var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
      // const editor = vscode.window.activeTextEditor; var selection = editor.selection;
      // var text = editor.document.getText(selection);

      terminal.show();
      terminal.sendText(
        `cd ${currentlyOpenTabfilePath.replace( //remove the filename from the path
          /[^\/]*$/,
          ""
        )} && npx cypress open --config testFiles="${currentlyOpenTabfilePath}"`
      );
}
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vscode-extension-open-cypress" is now active!'
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.runCypress", function () {
      // The code you place here will be executed every time your command is executed
      runCypressCommand()
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.runCypressOnly", function () {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor;
      const line = editor.document.lineAt(editor.selection.active.line);

      var text = editor.document.getText(line.range);
      if (!text.includes("it.only(")) {
        const indexOfIt = text.indexOf("it(");
        if (indexOfIt !== -1) {
          editor
            .edit((editBuilder) => {
              //editor is an object of active text editor

              editBuilder.replace(
                new vscode.Position(
                  editor.selection.active.line,
                  indexOfIt + 2
                ),
                ".only"
              ); // text = 'dummydummydummy'
            })
            .then(() => {
              editor.document.save();
            });
        }
      }
      runCypressCommand()
    })
  );
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
