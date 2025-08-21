#!/bin/bash

echo "📦 Node.js Installation Helper"
echo "============================="
echo ""
echo "Choose your installation method:"
echo ""
echo "1. Install via Homebrew (recommended if you want a package manager)"
echo "2. Install via nvm (Node Version Manager - good for managing multiple versions)"
echo "3. Download directly from nodejs.org (simplest option)"
echo ""
echo -n "Enter your choice (1-3) or 'q' to quit: "
read choice

case $choice in
    1)
        echo ""
        echo "🍺 Installing Homebrew first..."
        echo "This will ask for your password."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        
        # Add Homebrew to PATH for Apple Silicon Macs
        if [[ $(uname -m) == 'arm64' ]]; then
            echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
            eval "$(/opt/homebrew/bin/brew shellenv)"
        fi
        
        echo ""
        echo "📦 Installing Node.js via Homebrew..."
        brew install node
        
        echo ""
        echo "✅ Installation complete!"
        echo "Run 'node --version' to verify"
        ;;
        
    2)
        echo ""
        echo "📦 Installing nvm (Node Version Manager)..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        
        # Add nvm to shell
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        
        # Add to .zshrc for future sessions
        echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
        echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
        
        echo ""
        echo "📦 Installing Node.js LTS via nvm..."
        nvm install --lts
        nvm use --lts
        nvm alias default node
        
        echo ""
        echo "✅ Installation complete!"
        echo "Run 'node --version' to verify"
        ;;
        
    3)
        echo ""
        echo "📥 Opening nodejs.org in your default browser..."
        echo ""
        echo "Instructions:"
        echo "1. Download the macOS Installer (LTS version recommended)"
        echo "2. Open the downloaded .pkg file"
        echo "3. Follow the installation wizard"
        echo "4. Return here and run './setup.sh' when done"
        echo ""
        open "https://nodejs.org/en/download/"
        ;;
        
    q|Q)
        echo "Exiting..."
        exit 0
        ;;
        
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Next steps:"
echo "1. Close and reopen your terminal (or run: source ~/.zshrc)"
echo "2. Verify installation: node --version"
echo "3. Run the setup script: ./setup.sh"
