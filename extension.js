Object.defineProperty(exports, "__esModule", { value: true });

const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

//main activation function
function activate(context) {

	var enableExtension = false;

    vscode.commands.registerCommand('extension.enableNumberconverter', () => {
        vscode.window.showInformationMessage('Number Converter Enabled');
        enableExtension = true;
		console.log('Congratulations, your extension "number-converter-check" is now active!');
    });

    vscode.commands.registerCommand('extension.disableNumberconverter', () => {
        enableExtension = false;
        vscode.window.showInformationMessage('Number Converter Disabled');
    });

	var regexHex = /^0x[0-9a-fA-F]+$/g;
    var regexBin = /^[0-9a-fA-F]+[h]$/g;
    var regexDec = /^-?[0-9]+$/g;

	let hover = vscode.languages.registerHoverProvider({ scheme: '*', language: '*' }, {
        provideHover(document, position, token) {
            
			var hoveredWord = document.getText(document.getWordRangeAtPosition(position));
            var markdownString = new vscode.MarkdownString();
			var input = Number(hoveredWord.toString());

			if ((regexHex.test(hoveredWord.toString()) || regexBin.test(hoveredWord.toString())) && enableExtension) {
				var input = Number(hoveredWord.toString());
                markdownString.appendCodeblock(`Dec: ${parseInt(hoveredWord, 16)}\nHex: 0x${input.toString(16).toUpperCase()}\nBinary: 0b${parseInt(hoveredWord, 16).toString(2)}`, 'javascript');
                
				return {
                    contents: [markdownString]
                };
            }
			
            else if (regexDec.test(hoveredWord.toString()) && enableExtension) {
                markdownString.appendCodeblock(`Dec: ${hoveredWord}\nHex: 0x${input.toString(16).toUpperCase()}\nBinary: 0b${input.toString(2).replace(/(^\s+|\s+$)/, '')} `, 'javascript');
                
				return {
                    contents: [markdownString]
                };
            }
        }
    });

	context.subscriptions.push(hover);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
