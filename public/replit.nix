{ pkgs }: {
  deps = [
    pkgs.wget
    pkgs.openssh
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}