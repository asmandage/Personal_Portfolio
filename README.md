# Aniket Mandage - Portfolio Website

A modern, responsive portfolio website showcasing the work and skills of Aniket Mandage, a Full Stack .NET Developer.

## 🚀 Features

- **Fully Responsive Design** - Works perfectly on mobile, tablet, laptop, and desktop
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Working Contact Form** - Sends emails directly to aniketmandage85@gmail.com
- **Interactive Elements** - Animated skill circles, smooth scrolling, and hover effects
- **SEO Optimized** - Proper meta tags and semantic HTML structure
- **Fast Loading** - Optimized CSS and JavaScript for better performance

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.4.2
- **Fonts**: Inter (Google Fonts)
- **Form Handling**: Formspree.io (free service)

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Laptop**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Node.js (optional, for development server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/asmandage/Personal_Portfolio.git
cd Personal_Portfolio
```

2. Install dependencies (optional):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Or simply open `index.html` in your browser.

## 📧 Contact Form Setup

The contact form is configured to work with Formspree.io, a free service that handles form submissions. Here's how to set it up:

1. Go to [Formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form and get your form endpoint
4. Replace the form action URL in `index.html` with your Formspree endpoint

Alternatively, you can use the included `contact-handler.php` file if you have a PHP server.

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization. Edit the `:root` section in `style.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... other colors */
}
```

### Content
- Update personal information in `index.html`
- Replace project links and descriptions
- Modify skill percentages in the skills section
- Update social media links

### Images
- Replace `public/image/marrazo.png` with your profile picture
- Ensure images are optimized for web (WebP format recommended)

## 📁 Project Structure

```
Personal_Portfolio/
├── index.html              # Main HTML file
├── style.css              # Main CSS file
├── src/
│   └── JS/
│       └── script.js      # JavaScript functionality
├── public/
│   └── image/
│       └── marrazo.png    # Profile image
├── contact-handler.php    # PHP contact form handler (optional)
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🌐 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/Personal_Portfolio`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. Get a custom domain (optional)

### Vercel
1. Import your GitHub repository
2. Deploy with zero configuration
3. Get automatic HTTPS and global CDN

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm start` - Start production server
- `npm run build` - Build for production (placeholder)

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Aniket Mandage**
- Email: aniketmandage85@gmail.com
- GitHub: [@asmandage](https://github.com/asmandage)
- LinkedIn: [Aniket Mandage](https://www.linkedin.com/in/aniket-mandage-653980271)
- Instagram: [@an.iket_mandage](https://www.instagram.com/an.iket_mandage)

## 🙏 Acknowledgments

- Font Awesome for the amazing icons
- Google Fonts for the Inter font family
- Formspree for the contact form service
- All the open-source libraries and tools used

---

⭐ If you found this portfolio helpful, please give it a star on GitHub!
