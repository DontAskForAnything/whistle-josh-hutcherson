import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const provider = new ColorsViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ColorsViewProvider.viewType,
      provider,
    ),
  );
}

class ColorsViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'whistle.joshHutcherson';

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'),
    );
    const face0 = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'media', 'main.gif'),
    );

    return `
    <!doctype html>
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="${styleMainUri}" />
        </head>

        <body>

            <img class="doomFaces" src="${face0}" alt="" />
        </body>
    </html>
    `;
  }
}
