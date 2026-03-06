# 🚀 GitHub Setup Guide for ToolMetric

## 📋 Prerequisites
- [GitHub Account](https://github.com/signup)
- [Git installed](https://git-scm.com/downloads)
- Command line/terminal

## 🎯 Step 1: Create GitHub Repository

1. **Log in to GitHub**
2. **Click "+" → "New repository"**
3. **Repository name**: `toolmetric`
4. **Description**: `Free online tools for students, developers & professionals`
5. **Visibility**: Public (recommended)
6. **Don't initialize** with README, .gitignore, or license
7. **Click "Create repository"**

## 🎯 Step 2: Connect Local Repository to GitHub

### Option A: Using HTTPS (Recommended for beginners)
```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/toolmetric.git

# Push to GitHub
git push -u origin master
```

### Option B: Using SSH (For advanced users)
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Add SSH key to GitHub (copy ~/.ssh/id_rsa.pub to GitHub settings)

# Add remote origin
git remote add origin git@github.com:YOUR_USERNAME/toolmetric.git

# Push to GitHub
git push -u origin master
```

## 🎯 Step 3: Verify Deployment

1. **Visit your repository**: https://github.com/YOUR_USERNAME/toolmetric
2. **Check files**: All 54 files should be uploaded
3. **Verify README**: Should display properly
4. **Test live site**: Use GitHub Pages if enabled

## 🌐 GitHub Pages Setup (Optional but Recommended)

### Enable GitHub Pages:
1. **Go to repository settings**
2. **Scroll to "Pages" section**
3. **Source**: Deploy from a branch
4. **Branch**: master
5. **Folder**: / (root)
6. **Click "Save"**

### Your site will be live at:
`https://YOUR_USERNAME.github.io/toolmetric`

## 📁 Repository Structure After Upload

```
toolmetric/
├── 📄 index.html              # Modern homepage
├── 🎨 modern-styles.css     # Card-based CSS
├── 📝 README.md              # Project documentation
├── 📋 .gitignore            # Git ignore rules
├── 🔧 .htaccess              # Apache URL rewriting
├── 🗺️ sitemap.xml           # SEO sitemap
├── 🤖 robots.txt            # Search engine rules
├── 📄 tools/                 # All 30+ tool pages
│   ├── 📊 cgpa-calculator.html
│   ├── 📝 word-counter.html
│   ├── 🔐 password-generator.html
│   ├── 📋 json-formatter.html
│   └── ... (all other tools)
├── 📄 pages/                 # Information pages
│   ├── ℹ️ about.html
│   ├── 📧 contact.html
│   ├── 🔒 privacy.html
│   └── 📜 terms.html
└── 🎨 styles.css             # Base styles
```

## 🔧 Git Commands Reference

### Basic Commands:
```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Check remote
git remote -v
```

### Branch Management:
```bash
# Create new branch
git checkout -b feature/new-tool

# Switch branches
git checkout master
git checkout feature/new-tool

# Merge branches
git merge feature/new-tool

# Delete branch
git branch -d feature/new-tool
```

## 🎯 Next Steps After Upload

1. **Test the live site** on GitHub Pages
2. **Update any broken links** if needed
3. **Add GitHub topics** to repository:
   - `free-tools`
   - `online-tools`
   - `student-tools`
   - `developer-tools`
   - `web-tools`
4. **Set up GitHub Actions** for CI/CD (optional)
5. **Add contributors** and collaboration guidelines

## 🌟 Repository Best Practices

### README.md:
- ✅ Professional description
- ✅ Feature list with emojis
- ✅ Installation instructions
- ✅ Live demo link
- ✅ Technologies used
- ✅ Contributing guidelines

### Repository Settings:
- ✅ Enable Issues for bug reports
- ✅ Enable Discussions for community
- ✅ Add repository topics
- ✅ Set up GitHub Pages
- ✅ Add website URL in settings

### Security:
- ✅ Repository is public (for tool website)
- ✅ No sensitive data in repository
- ✅ Professional commit messages
- ✅ Regular updates and maintenance

## 📞 Support

If you encounter any issues:

1. **GitHub Issues**: Report bugs in repository
2. **GitHub Discussions**: Ask questions
3. **Email**: contact@toolmetric.com
4. **Documentation**: Check README.md

## 🎉 Congratulations!

Once completed, your ToolMetric website will be:
- **Live on GitHub Pages** (if enabled)
- **Available to global audience**
- **Professionally presented**
- **Easy to maintain and update**

**Your free online tools website will be accessible to millions!** 🚀
