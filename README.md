# Invincible Tic-Tac-Toe 🎮

An unbeatable Tic-Tac-Toe game powered by the Minimax algorithm. Play against an AI that never loses!

## Features

- 🤖 **Unbeatable AI**: Uses the Minimax algorithm for perfect play
- 🎨 **Modern UI**: Built with Tailwind CSS for a sleek, responsive design
- ⚡ **Fast & Lightweight**: Pure vanilla JavaScript, no frameworks required
- 📱 **Mobile Friendly**: Responsive design works on all devices

## Live Demo

🚀 **[Play Now](https://mark7588.github.io/invincible_tictactoe/)**

## Deployment

This application is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the `main` branch automatically triggers a deployment to GitHub Pages. The workflow:

1. Checks out the code
2. Configures GitHub Pages
3. Uploads the static files
4. Deploys to GitHub Pages

### Manual Deployment

You can also trigger a deployment manually:

1. Go to the "Actions" tab in the GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

### Local Development

To run this application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/mark7588/invincible_tictactoe.git
   cd invincible_tictactoe
   ```

2. Open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

## How to Play

1. You are **X** (red), and the AI is **O** (blue)
2. Click on any empty cell to make your move
3. The AI will automatically respond after a short delay
4. Try to get three in a row (horizontally, vertically, or diagonally)
5. The AI uses the Minimax algorithm, so it's unbeatable - your best result is a draw!

## Technology Stack

- **HTML5**: Structure
- **CSS3**: Custom styling
- **Tailwind CSS**: Utility-first CSS framework (loaded via CDN)
- **JavaScript**: Game logic and Minimax algorithm
- **GitHub Actions**: CI/CD for automatic deployment
- **GitHub Pages**: Hosting platform

## Project Structure

```
invincible_tictactoe/
├── index.html          # Main HTML file
├── script.js           # Game logic and Minimax algorithm
├── style.css           # Custom styles
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment workflow
└── README.md           # This file
```

## Algorithm

The AI uses the **Minimax algorithm**, a recursive decision-making algorithm that:

1. Explores all possible game states
2. Assigns scores to terminal states (win = +10, loss = -10, draw = 0)
3. Assumes both players play optimally
4. Chooses the move that maximizes the AI's score while minimizing the opponent's

This ensures the AI never loses - it will either win or force a draw.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements!

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Minimax algorithm implementation based on game theory principles
- UI design inspired by modern web design trends
- Tailwind CSS for rapid styling

---

Made with ❤️ by mark7588
