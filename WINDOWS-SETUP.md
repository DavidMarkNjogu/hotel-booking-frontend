# 🪟 Windows Setup Guide

## Current Situation

Your project files are in **Claude Code's workspace**, not on your Windows PC yet.

## ✅ Quick Test (Do This First!)

1. **Create file**: Open Notepad
2. **Copy code from**: `STANDALONE-LOGIN.html` (in this folder)
3. **Save as**: `hotel-demo.html` (All Files type)
4. **Double-click** to open in browser
5. **See it work!** ✨

## 📥 Get ALL Files to Windows

### Option A: Download from Claude Code Interface

If you can see a file explorer in Claude Code:

1. Navigate to `hotel-booking-frontend/` folder
2. Right-click each file → **Download**
3. Recreate folder structure on Windows:

```
C:\Users\user pc\hotel-booking-frontend\
├── assets\
│   ├── css\
│   │   ├── style.css
│   │   ├── components.css
│   │   └── admin.css
│   └── js\
│       ├── main.js
│       ├── booking.js
│       └── admin.js
├── includes\
├── public\
└── admin\
```

### Option B: Copy-Paste Individual Files

For each file:
1. Ask me to show you the file content
2. Copy to Notepad
3. Save with correct name and location

Example:
```
"Show me style.css"
Copy → Save as → C:\Users\user pc\hotel-booking-frontend\assets\css\style.css
```

### Option C: Use SFTP/FTP (Advanced)

If Claude Code provides file access:
- Use FileZilla or WinSCP
- Connect to workspace
- Download entire folder

## 🚀 Run on Windows

### Method 1: Python (You already have it!)

```cmd
cd C:\Users\user pc\hotel-booking-frontend
python -m http.server 8000
```

Then open: `http://localhost:8000/public/login.html`

### Method 2: PHP Server

```cmd
cd C:\Users\user pc\hotel-booking-frontend
php -S localhost:8000
```

Then open: `http://localhost:8000/public/login.html`

### Method 3: VS Code Live Server

1. Open folder in VS Code
2. Install "Live Server" extension
3. Right-click `login.html` → "Open with Live Server"

### Method 4: XAMPP (Full PHP + MySQL)

1. Download XAMPP: https://www.apachefriends.org/
2. Install it
3. Copy project to: `C:\xampp\htdocs\hotel-booking-frontend\`
4. Start Apache in XAMPP
5. Open: `http://localhost/hotel-booking-frontend/public/login.html`

## 🌐 Put Online (Free!)

### GitHub + Netlify

1. **Install Git**: https://git-scm.com/download/win
2. **Push to GitHub**:
```cmd
cd C:\Users\user pc\hotel-booking-frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/hotel-booking-frontend.git
git push -u origin main
```

3. **Deploy on Netlify**:
   - Go to netlify.com
   - Connect GitHub repo
   - Deploy (automatic!)
   - Get URL: `https://your-site.netlify.app`

## 📁 What You Have

| File | Size | Purpose |
|------|------|---------|
| style.css | ~60 KB | Main green theme |
| components.css | ~25 KB | Reusable components |
| admin.css | ~20 KB | Admin dashboard |
| main.js | ~15 KB | Core utilities |
| booking.js | ~12 KB | Booking functionality |
| admin.js | ~12 KB | Admin features |
| login.html | ~10 KB | Complete reference page |

**Total**: ~154 KB of production-ready code!

## ✅ Checklist

- [ ] Tested standalone demo (hotel-demo.html)
- [ ] Downloaded all files from workspace
- [ ] Recreated folder structure on Windows
- [ ] Started local server (Python or PHP)
- [ ] Viewed login page in browser
- [ ] Tested responsive design (F12 → Device toolbar)
- [ ] Checked all JavaScript works
- [ ] Ready to create remaining pages

## 🆘 Troubleshooting

**"Python not found"**
- Use `python` instead of `python3`
- Or install from: https://www.python.org/downloads/

**"Files not loading"**
- Check file paths are correct
- Make sure server runs from project root
- Use forward slashes in HTML: `/assets/css/style.css`

**"Want to see a specific file"**
- Ask me: "Show me [filename]"
- I'll display the content
- Copy and save on your Windows PC

**"Need help with a specific file"**
- Tell me which file you need
- I'll help you copy it to Windows

## 🎯 Next Steps

1. ✅ Test the standalone demo first
2. ✅ Download individual files you need
3. ✅ Run local server to view
4. ✅ Create remaining pages (templates in IMPLEMENTATION-GUIDE.md)
5. ✅ Add your images
6. ✅ Deploy online (Netlify/Vercel)

---

**Note**: The files are currently in Claude Code's server workspace. You need to download/copy them to your Windows machine to use them locally.

Need help with a specific file? Just ask! 🚀
