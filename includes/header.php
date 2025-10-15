<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="LuxeStay Hotel - Your premium hotel booking experience">
    <meta name="keywords" content="hotel, booking, luxury, accommodation">
    <title><?php echo isset($pageTitle) ? $pageTitle . ' - LuxeStay Hotel' : 'LuxeStay Hotel'; ?></title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/images/favicon.png">

    <!-- CSS -->
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="/assets/css/components.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Additional CSS if needed -->
    <?php if (isset($additionalCSS)): ?>
        <?php foreach ($additionalCSS as $css): ?>
            <link rel="stylesheet" href="<?php echo $css; ?>">
        <?php endforeach; ?>
    <?php endif; ?>
</head>
<body>

<!-- Navbar -->
<nav class="navbar <?php echo isset($navbarClass) ? $navbarClass : ''; ?>">
    <!-- Logo -->
    <div class="logo">
        <a href="/index.html">LuxeStay</a>
    </div>

    <!-- Hamburger Menu (Mobile) -->
    <div class="hamburger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>

    <!-- Navigation Menu -->
    <div class="nav-menu">
        <ul class="nav-ul">
            <li class="<?php echo (isset($activePage) && $activePage === 'home') ? 'active' : ''; ?>">
                <a href="/index.html">Home</a>
            </li>
            <li class="<?php echo (isset($activePage) && $activePage === 'rooms') ? 'active' : ''; ?>">
                <a href="/public/rooms.html">Rooms</a>
            </li>
            <li class="<?php echo (isset($activePage) && $activePage === 'about') ? 'active' : ''; ?>">
                <a href="/index.html#about">About</a>
            </li>
            <li class="<?php echo (isset($activePage) && $activePage === 'contact') ? 'active' : ''; ?>">
                <a href="/index.html#contact">Contact</a>
            </li>
            <?php if (isset($isLoggedIn) && $isLoggedIn): ?>
                <li class="<?php echo (isset($activePage) && $activePage === 'profile') ? 'active' : ''; ?>">
                    <a href="/public/profile.html">My Profile</a>
                </li>
            <?php endif; ?>
        </ul>

        <!-- Credentials (Desktop) -->
        <div class="credentials">
            <?php if (isset($isLoggedIn) && $isLoggedIn): ?>
                <a href="/public/profile.html" class="button button-primary">
                    <i class="fas fa-user"></i> Profile
                </a>
                <a href="/logout.php" class="button button-secondary">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            <?php else: ?>
                <a href="/public/login.html" class="button button-secondary">Login</a>
                <a href="/public/login.html?tab=register" class="button button-primary">Sign Up</a>
            <?php endif; ?>
        </div>
    </div>
</nav>
